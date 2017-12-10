import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private _el:ElementRef, private _renderer:Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this._renderer.addClass(this._el.nativeElement, 'highlight');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._renderer.removeClass(this._el.nativeElement, 'highlight');
  }
}
