import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appOtpAutoFocus]'
})
export class OtpAutoFocusDirective implements AfterViewInit {
    digitInputs!: HTMLInputElement[];
    constructor(
        private el: ElementRef
    ) { }
    @HostListener('keyup', ['$event']) hnadleKeyup(event: any): void {
        const inputValue = parseInt(event.target.value, 10);
        const idx = parseInt(event.target.id, 10);
        if (inputValue && inputValue > 9) {
            event.target.value = parseInt(('' + event.target.value).slice(-1), 10);
        }
        if ([8, 37].includes(event.keyCode) && idx > 0) {
            this.digitInputs[idx - 1].focus();
        } else if ([39].includes(event.keyCode) && idx < 5) {
            this.digitInputs[idx + 1].focus();
        } else if (inputValue && idx < 5) {
            this.digitInputs[idx + 1].focus();
        }
    }

    ngAfterViewInit(): void {
        this.digitInputs = this.el.nativeElement.querySelectorAll('input');
        // digitInputs.forEach((digit, idx) => {
        //     if (idx === 0) {
        //         digit.focus();
        //     }
        //     digit.onkeyup = (event: any) => {
        //         const inputValue = parseInt(event.target.value, 10);
        //         if (inputValue && inputValue > 9) {
        //             event.target.value = parseInt(('' + event.target.value).slice(-1), 10);
        //         }
        //         if ([8, 37].includes(event.keyCode) && idx > 0) {
        //             digitInputs[idx - 1].focus();
        //         } else if ([39].includes(event.keyCode) && idx < 5) {
        //             digitInputs[idx + 1].focus();
        //         } else if (inputValue && idx < 5) {
        //             digitInputs[idx + 1].focus();
        //         }
        //     };
        // });
    }
}
