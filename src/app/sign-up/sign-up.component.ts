import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpService],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  status: string;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, this.signUpService.emailValidator]],
      password: ['', [Validators.required, this.signUpService.passwordValidator, Validators.minLength(8)]]
    }, {
      validators: [this.signUpService.nameInPasswordValidator]
    });
  }

  /**
   * Validates the Form and Signs Up if valid
   */
  signUp(): void {
    if (this.signUpForm.dirty && this.signUpForm.valid) {
      this.status = '';
      this.isLoading = true;

      this.signUpService.signUp(this.signUpForm.value).subscribe(() => {
        this.isLoading = false;
        this.status = this.signUpService.getStatus('success');
      }, (error) => {
        console.warn(error);
        this.isLoading = false;
        this.status = this.signUpService.getStatus('error');
      });
    } else {
      // Validate all the fields
      Object.keys(this.signUpForm.controls).forEach(field => {
        const control = this.signUpForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }

  /**
   * Generates an error message
   * @param control: string - control name as specified in formControlName
   */
  getErrorMessage(control): string | null {
    const controlField = this.signUpForm.get(control);
    for (const propertyName in controlField.errors) {
      if (controlField.touched && controlField.errors.hasOwnProperty(propertyName) && controlField.errors[propertyName]) {
        return this.signUpService.getValidatorErrorMessage(propertyName, controlField.errors[propertyName]);
      }
    }
    return null;
  }

  /**
   * The check to show an error message if Password contains First or Last Name in it
   */
  checkPasswordContainsName(): boolean {
    return this.signUpForm.hasError('invalidFirstNameContaining');
  }
}
