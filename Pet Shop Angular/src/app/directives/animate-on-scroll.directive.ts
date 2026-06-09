import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Output() visible = new EventEmitter<boolean>();
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible.emit(true);
          // Once visible, we can stop observing if we only want the animation to trigger once
          // But React's whileInView can trigger multiple times. Let's make it configurable if needed.
          // For now, let's keep it simple: trigger once for performance or multiple for fidelity.
          // User's React code: viewport={{ once: false, margin: "-100px" }}
          // So it triggers every time.
        } else {
          this.visible.emit(false);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-100px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
