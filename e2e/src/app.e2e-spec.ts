import { browser, logging, $ } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display the form', async () => {
    await page.navigateTo();
    const signUpForm = await page.getForm();
    expect(signUpForm).not.toBeUndefined();
  });

  it('should show the validation errors while filling', async () => {
    await page.navigateTo();

    await page.setPasswordNameField('pass');
    await page.setLastNameField('D');
    const passwordValidation = await page.getPasswordValidation();

    expect(await passwordValidation.getText()).toEqual('Password must contain at least one uppercase letter');
  });

  it('should hide the validation errors on value change', async () => {
    await page.navigateTo();

    await page.setPasswordNameField('pass');
    await page.setLastNameField('D');
    await page.setPasswordNameField('1234567Aa');
    const passwordValidation = await page.getPasswordValidation();

    expect(await passwordValidation.getText()).toEqual('');
  });

  it('should show the validation errors while sending the form', async () => {
    await page.navigateTo();

    await page.submitForm();
    const passwordValidation = await page.getPasswordValidation();

    expect(await passwordValidation.getText()).toEqual('Required');
  });

  it('should show the success message', async () => {
    await page.navigateTo();

    await page.setFirstNameField('John');
    await page.setLastNameField('Doe');
    await page.setEmailNameField('john@doe.com');
    await page.setPasswordNameField('1234567Aa');

    await page.submitForm();

    const status = await page.getStatus();
    expect(await status.getText()).toEqual('Your account was successfully created!');
  });
});
