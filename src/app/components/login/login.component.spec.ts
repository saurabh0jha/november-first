import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { PreventPasteDirective } from 'src/app/directives/preventPaste.directive';
import { OtpAutoFocusDirective } from 'src/app/directives/appOtpAutoFocus.directive';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [LoginComponent, PreventPasteDirective, OtpAutoFocusDirective]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  it('form invalid when empty', () => {
    expect(component.otpForm.valid).toBeFalsy();
  });

  it('form valid when all OTP digits are entered', fakeAsync(() => {
    fixture.detectChanges();
    const digitInputs: HTMLInputElement[] = component.otpFormElement.nativeElement.querySelectorAll('input');

    ['9', '2', '4', '7', '8', '9'].forEach((key, idx) => {
      dispatchKeyEvent(key, digitInputs[idx], 0);
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.otpForm.valid).toBeTrue();
    });
  }));

  it('form invalid when backspace is pressed on the last digit', fakeAsync(() => {
    fixture.detectChanges();
    const digitInputs: HTMLInputElement[] = component.otpFormElement.nativeElement.querySelectorAll('input');

    ['9', '2', '4', '1', '5', '9'].forEach((key, idx) => {
      dispatchKeyEvent(key, digitInputs[idx], 0);
    });
    dispatchKeyEvent('Backspace', digitInputs[5], 8);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.otpForm.valid).toBeFalse();
    });
  }));

  it('form valid when left arrow is used to modify the OTP', fakeAsync(() => {
    fixture.detectChanges();
    const digitInputs: HTMLInputElement[] = component.otpFormElement.nativeElement.querySelectorAll('input');

    ['9', '2', '4', '1', '5'].forEach((key, idx) => {
      dispatchKeyEvent(key, digitInputs[idx], 0);
    });
    dispatchKeyEvent('ArrowLeft', digitInputs[5], 37);
    dispatchKeyEvent('7', digitInputs[4], 0);
    dispatchKeyEvent('3', digitInputs[5], 0);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.otpForm.valid).toBeTrue();
    });
  }));

});


function dispatchKeyEvent(key: string, elem: HTMLInputElement, keyCode: number): void {
  if (!isNaN(parseInt(key, 10))) {
    elem.value = '' + key;
    elem.dispatchEvent(new Event('input'));
  }
  // Backspace
  if (keyCode === 8) {
    elem.value = '';
    elem.dispatchEvent(new Event('input'));
  }
  tick();
  const eventParams: any = {
    key,
    bubbles: true,
    cancelable: true,
    isTrusted: true,
    location: 1
  };
  if (keyCode) {
    eventParams.keyCode = keyCode;
  }

  elem.dispatchEvent(new KeyboardEvent('keydown', eventParams));
  elem.dispatchEvent(new KeyboardEvent('keypress', eventParams));
  elem.dispatchEvent(new KeyboardEvent('keyup', eventParams));
  tick();
}
