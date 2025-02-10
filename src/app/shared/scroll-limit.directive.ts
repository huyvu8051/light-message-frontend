import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({
  standalone: true,
  selector: '[appScrollLimit]'
})
export class ScrollLimitDirective {
  readonly THRESHOLD = 10

  @Output() scrolledToBottom = new EventEmitter<void>()
  scrolledToBottom$ = this.scrolledToBottom.asObservable()

  @Output() scrolledToTop = new EventEmitter<void>()

  constructor(private el: ElementRef) {
  }

  @HostListener('scroll')
  onScroll(): void {
    this.checkScrollPosition()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScrollPosition()
  }


  private checkScrollPosition(): void {
    const element = this.el.nativeElement
    // console.log(element.scrollTop, element.clientHeight, this.THRESHOLD, element.scrollTop + element.clientHeight + this.THRESHOLD, element.scrollHeight)
    const atBottom = Math.abs(element.scrollTop) + element.clientHeight + this.THRESHOLD >= element.scrollHeight
    const atTop = element.scrollTop === 0

    if (atBottom) {
      this.scrolledToBottom.emit()
    }

    if (atTop) {
      this.scrolledToTop.emit()
    }
  }

}
