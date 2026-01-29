import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-breadcumbs',
  imports: [],
  templateUrl: './breadcumbs.html',
  styleUrl: './breadcumbs.css',
})
export class Breadcumbs implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    // Clean up GSAP animations
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private initAnimations(): void {
    // Breadcrumb mask-reveal with stagger and spatial movement
    gsap.from('.breadcrumb-item', {
      x: -20,
      y: -10, // Slight vertical displacement
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'expo.out',
    });

    gsap.from('.separator', {
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
      delay: 0.15,
      ease: 'expo.out',
    });

    // Title reveal with spatial Y movement
    gsap.from('.page-title h1', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40, // Spatial displacement emphasizes occupation of space
      duration: 1.2,
      ease: 'expo.out',
      delay: 0.5,
    });

    // Intro text with Y displacement
    gsap.from('.intro-text', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'expo.out',
    });

    // Type items mask-reveal with spatial movement
    gsap.from('.type-item', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40, // Emphasizes vertical space occupation
      duration: 1.2,
      stagger: 0.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.types-section',
        start: 'top 80%',
      },
    });

    // Practice items reveal with Y displacement
    gsap.from('.practice-item', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.practices-section',
        start: 'top 80%',
      },
    });
  }
}
