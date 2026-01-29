import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-mapa-sitio',
  imports: [],
  templateUrl: './mapa-sitio.html',
  styleUrl: './mapa-sitio.css',
})
export class MapaSitio implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    // Clean up GSAP animations - matches Breadcrumbs
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private initAnimations(): void {
    // Breadcrumb animation - exact match from Breadcrumbs
    gsap.from('.breadcrumb-item', {
      x: -20,
      y: -10,
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

    // Title reveal - exact match from Breadcrumbs
    gsap.from('.page-title h1', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40,
      duration: 1.2,
      ease: 'expo.out',
      delay: 0.5,
    });

    // Intro text - exact match from Breadcrumbs
    gsap.from('.intro-text', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'expo.out',
    });

    // Sitemap links - matches practice-item animation
    gsap.from('.sitemap-link', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15, // Same as practice-item
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.sitemap-category',
        start: 'top 80%',
      },
    });

    // Sitemap types - matches type-item animation
    gsap.from('.sitemap-type', {
      clipPath: 'inset(0 100% 0 0)',
      y: 40,
      duration: 1.2,
      stagger: 0.2, // Same as type-item
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.definition-block',
        start: 'top 80%',
      },
    });
  }
}
