import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignUpData } from './sign-up';


@Injectable({providedIn: 'root'})
export class SignUpService {
  signUpUrl = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) {
  }

  getStatus(status: string): string {
    switch (status) {
      case 'success':
        return 'Your account was successfully created!';
      case 'error':
        return 'Error occurred while trying to create an account. Please try again later.';
    }
  }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config = {
      required: 'Required',
      minlength: `Minimum length is ${validatorValue?.requiredLength}`,
      invalidUpperCaseCharacters: 'Password must contain at least one uppercase letter',
      invalidLowerCaseCharacters: 'Password must contain at least one lowercase letter',
      hasProperNumberOfCharacters: `Password must be at least 8 characters long`,
      invalidFirstNameContaining: 'Password can not contain SignUpData Name in it'
    };

    return config[validatorName];
  }

  /**
   * Validates email based on RFC 2822 compliant regex
   * @param control: FormControl
   */
  emailValidator(control: FormControl): ValidationErrors | null {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {invalidEmailAddress: true};
    }
  }

  /**
   * Validates if Password contains one Upper Case Characters and one Lower Case Characters
   * @param control: FormControl
   */
  passwordValidator(control: FormControl): ValidationErrors | null {
    // Latin only
    const hasUpperCaseCharacters = /[A-Z]+/g.test(control.value);
    const hasLowerCaseCharacters = /[a-z]+/g.test(control.value);

    if (!hasUpperCaseCharacters || !hasLowerCaseCharacters) {
      return {
        invalidUpperCaseCharacters: !hasUpperCaseCharacters,
        invalidLowerCaseCharacters: !hasLowerCaseCharacters,
      };
    }
    return null;
  }

  /**
   * Validates if Password contains First or Last Name in it
   * @param formGroup: FormGroup
   */
  nameInPasswordValidator(formGroup: FormGroup): ValidationErrors | null {
    const firstName = formGroup.get('firstName').value.toLowerCase();
    const lastName = formGroup.get('lastName').value.toLowerCase();
    const password = formGroup.get('password').value.toLowerCase();
    if ((firstName.length && password.includes(firstName)) || (lastName.length && password.includes(lastName))) {
      return {invalidFirstNameContaining: true};
    }
    return null;
  }

  /**
   * Server call to Sign Up SignUpData
   * @param user: SignUpData
   */
  signUp(user: SignUpData): Observable<SignUpData> {
    return this.http.post<SignUpData>(this.signUpUrl, user)
      .pipe(
        catchError((error) => {
          return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
        })
      );
  }
}
