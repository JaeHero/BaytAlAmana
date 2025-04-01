import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Directive({
  selector: '[appVanillaTilt]',
  standalone: true,
})
export class VanillaTiltDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    VanillaTilt.init(this.el.nativeElement, {
      max: 25, // Maximum tilt rotation in degrees
      speed: 400, // Speed of the transition
      glare: true, // Enable glare effect
      'max-glare': 0.5, // Maximum glare opacity
      scale: 1.1,
    });
  }
}
