import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import AOS from 'aos';

@Directive({
  selector: '[appAos]',
  standalone: true,
})
export class AosDirective implements AfterViewInit {
  @Input('appAos') animationType: string = 'fade-up';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (!this.el.nativeElement.getAttribute('data-aos')) {
      this.el.nativeElement.setAttribute('data-aos', this.animationType);
    }

    AOS.init({
      duration: 3000,
      once: true,
      mirror: true,
    });
  }
}
