import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollLimit]'
})
export class ScrollLimitDirective {
  readonly THRESHOLD = 10;

  @Output() scrolledToBottom = new EventEmitter<void>();
  @Output() scrolledToTop = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('scroll')
  onScroll(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const element = this.el.nativeElement;

    const atBottom = -element.scrollTop + element.clientHeight + this.THRESHOLD >= element.scrollHeight;
    const atTop = element.scrollTop === 0;

    if (atBottom) {
      this.scrolledToBottom.emit();
    }

    if (atTop) {
      this.scrolledToTop.emit();
    }
  }
}
