import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from './sign-up.service';

describe('SignUpComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: SignUpService;

  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'Password123'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SignUpService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    signUpService = TestBed.inject(SignUpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a signUpForm', () => {
    expect(component.signUpForm).not.toBeUndefined();
  });

  it('should Sign Up the user', () => {
    component.signUpForm.setValue(testUser);
    component.signUpForm.markAsDirty();

    expect(component.isLoading).toBeFalse();

    component.signUp();
    expect(component.isLoading).toBeTrue();

    const req = httpTestingController.expectOne(`https://demo-api.now.sh/users`);
    req.flush(testUser);

    expect(component.isLoading).toBeFalse();
    expect(component.status.toLowerCase()).toContain('success');
  });

  it('should process Sign Up error', () => {
    component.signUpForm.setValue(testUser);
    component.signUpForm.markAsDirty();

    expect(component.isLoading).toBeFalse();

    component.signUp();
    expect(component.isLoading).toBeTrue();

    const req = httpTestingController.expectOne(`https://demo-api.now.sh/users`);
    req.flush('401 error', {status: 401, statusText: 'Unauthorized'});

    expect(component.isLoading).toBeFalse();
    expect(component.status.toLowerCase()).toContain('error');
  });

  it('should validate the fields', () => {
    expect(component.signUpForm.get('firstName').touched).toBeFalse();
    component.signUp();
    expect(component.signUpForm.get('firstName').touched).toBeTrue();
    expect(component.signUpForm.get('firstName').valid).toBeFalse();
  });

  it('should get the error message', () => {
    const noErrorMessage = component.getErrorMessage('firstName');
    expect(noErrorMessage).toEqual(null);

    const control = component.signUpForm.get('firstName');
    control.markAsTouched({onlySelf: true});

    const errorMessage = component.getErrorMessage('firstName');
    expect(errorMessage).toEqual('Required');
  });

  it('should check the Password Contains Name error', () => {
    expect(component.checkPasswordContainsName()).toBeFalse();

    component.signUpForm.get('firstName').setValue('John');
    component.signUpForm.get('password').setValue('IAmJohnDoe');

    expect(component.checkPasswordContainsName()).toBeTrue();
  });
});
