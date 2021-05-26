import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('submit') submitBtn!: ElementRef;
  @ViewChild('otpFormEl') otpFormElement!: ElementRef;

  otpForm: FormGroup = new FormGroup({});
  userEmail = 'mark@skyholding.dk';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.initOtpForm();
  }

  ngAfterViewInit(): void {
    this.addFormSubscriptions();
  }

  /**
   * Create the otp form and formarray
   */
  initOtpForm(): void {
    this.otpForm = this.fb.group({
      otp: this.fb.array([])
    });
    for (let i = 0; i < 6; i++) {
      this.otpFormArray.push(this.fb.group({
        digit: [null, Validators.required]
      }));
    }
  }

  /**
   * Add form change handling
   */
  addFormSubscriptions(): void {
    this.otpFormArray.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.submitBtn.nativeElement.click();
      }
    });
  }

  /**
   * Get OTP form array
   * @returns Otp Form Array
   */
  get otpFormArray(): FormArray {
    return this.otpForm.controls.otp as FormArray;
  }

  onOtpSubmit(): void {
    const otpDigits = this.otpFormArray.value.map((otp: any) => otp.digit);
    this.apiService.submitOtp(otpDigits.join('')).subscribe((resp) => {
      alert('OTP Submitted Successfully!');
    });
  }

}
