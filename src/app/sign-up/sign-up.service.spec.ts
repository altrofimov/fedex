import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { TestBed } from '@angular/core/testing';

describe('SignUpService', () => {
  let httpTestingController: HttpTestingController;
  let signUpService: SignUpService;
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'Password123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    signUpService = TestBed.inject(SignUpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(signUpService).toBeTruthy();
  });

  it('should get the status', () => {
    expect(signUpService.getStatus('success')).toEqual('Your account was successfully created!');
    expect(signUpService.getStatus('error')).toEqual('Error occurred while trying to create an account. Please try again later.');
  });

  it('should get the validator error message', () => {
    expect(signUpService.getValidatorErrorMessage('required')).toEqual('Required');
  });

  it('should validate the email', () => {
    const validEmailControl = new FormControl('john@doe.com');
    const invalidEmailControl = new FormControl('john@@doe.com');

    expect(signUpService.emailValidator(validEmailControl)).toEqual(null);
    expect(signUpService.emailValidator(invalidEmailControl)).toEqual({invalidEmailAddress: true});
  });

  it('should validate the password', () => {
    const noUpperCasePasswordControl = new FormControl('1234567a');
    const noLowerCasePasswordControl = new FormControl('1234567A');
    const validPasswordControl = new FormControl('1234567Aa');

    expect(signUpService.passwordValidator(noUpperCasePasswordControl)).toEqual({
      invalidUpperCaseCharacters: true,
      invalidLowerCaseCharacters: false,
    });
    expect(signUpService.passwordValidator(noLowerCasePasswordControl)).toEqual({
      invalidUpperCaseCharacters: false,
      invalidLowerCaseCharacters: true,
    });
    expect(signUpService.passwordValidator(validPasswordControl)).toEqual(null);
  });

  it('should validate the password', () => {
    const signUpForm = new FormGroup({
      firstName: new FormControl('John'),
      lastName: new FormControl('Doe'),
      password: new FormControl('password123')
    });
    expect(signUpService.nameInPasswordValidator(signUpForm)).toEqual(null);

    signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      password: '123John456',
    });
    expect(signUpService.nameInPasswordValidator(signUpForm)).toEqual({invalidFirstNameContaining: true});

    signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      password: '123Doe456',
    });
    expect(signUpService.nameInPasswordValidator(signUpForm)).toEqual({invalidFirstNameContaining: true});
  });

  it('should sign up', () => {
    signUpService.signUp(testUser).subscribe((user) => {
      expect(user).toEqual(testUser);
    });

    const req = httpTestingController.expectOne(`https://demo-api.now.sh/users`);
    req.flush(testUser);
  });

  it('should fire an error', () => {
    signUpService.signUp(testUser).subscribe((response) => {
      expect(response).toEqual(testUser);
    }, (error) => {
      expect(error).toContain('404');
    });

    const req = httpTestingController.expectOne(`https://demo-api.now.sh/users`);
    req.flush('404 Error', {status: 404, statusText: 'Page not found'});
  });
});
