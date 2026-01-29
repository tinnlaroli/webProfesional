import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private geometries: THREE.Mesh[] = [];
  private animationId: number = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.createGeometricComposition();
    this.animate();
    this.initGSAPAnimations();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    // Clean up geometries
    this.geometries.forEach(mesh => {
      mesh.geometry.dispose();
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      }
    });
    // Kill GSAP animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xFFFFFF);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: false 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private createGeometricComposition(): void {
    // Cube 1 - Red accent with matte material
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshLambertMaterial({ 
        color: 0xFF0000, 
        flatShading: true,
        emissive: 0x000000
      })
    );
    cube1.position.set(-3, 2, 0);
    this.scene.add(cube1);
    this.geometries.push(cube1);

    // Cube 2 - Black with matte material
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.MeshLambertMaterial({ 
        color: 0x000000, 
        flatShading: true,
        emissive: 0x000000
      })
    );
    cube2.position.set(3, -1, 0);
    this.scene.add(cube2);
    this.geometries.push(cube2);

    // Plane - Gray
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshBasicMaterial({ color: 0x1A1A1A, side: THREE.DoubleSide })
    );
    plane.position.set(0, -3, -2);
    plane.rotation.x = Math.PI / 6;
    this.scene.add(plane);
    this.geometries.push(plane);

    // Sphere - White with black wireframe
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    );
    sphere.position.set(0, 1, 2);
    this.scene.add(sphere);
    this.geometries.push(sphere);

    // Flat lighting for 2D aesthetic
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.2);
    directionalLight.position.set(0, 0, 10);
    this.scene.add(directionalLight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Slow, precise orthogonal rotation
    this.geometries.forEach((mesh, index) => {
      if (index === 0) {
        // Cube 1: rotate on X and Y
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.001;
      } else if (index === 1) {
        // Cube 2: rotate on Y only
        mesh.rotation.y += 0.002;
      } else if (index === 3) {
        // Sphere: rotate on Z
        mesh.rotation.z += 0.0015;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  private initGSAPAnimations(): void {
    // Title mask-reveal with spatial movement
    gsap.from('.title-swiss', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40, // Spatial displacement emphasizes occupation of space
      duration: 1.2,
      ease: 'expo.out'
    });

    // Subtitle reveal with Y displacement
    gsap.from('.subtitle-swiss', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'expo.out'
    });

    // Technical blocks mask-reveal with stagger and spatial movement
    gsap.from('.technical-item', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40, // Emphasizes vertical space occupation
      duration: 1.0,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.technical-section',
        start: 'top 80%'
      }
    });

    // Command blocks mask-reveal with spatial movement
    gsap.from('.command-item', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40,
      duration: 1.0,
      stagger: 0.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.commands-section',
        start: 'top 80%'
      }
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
