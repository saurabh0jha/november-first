import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventPaste]'
})
export class PreventPasteDirective {
  constructor() { }

  @HostListener('paste', ['$event']) preventPaste(e: KeyboardEvent): void {
    e.preventDefault();
  }
}
