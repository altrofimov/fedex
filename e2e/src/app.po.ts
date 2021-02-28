import { browser, ElementFinder, $ } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getForm(): Promise<HTMLElement> {
    return $('.sign-up');
  }

  async setFirstNameField(keys): Promise<ElementFinder> {
    return $('#firstName').sendKeys(keys);
  }

  async setLastNameField(keys): Promise<ElementFinder> {
    return $('#lastName').sendKeys(keys);
  }

  async setEmailNameField(keys): Promise<ElementFinder> {
    return $('#email').sendKeys(keys);
  }

  async setPasswordNameField(keys): Promise<ElementFinder> {
    return $('#password').sendKeys(keys);
  }

  async getPasswordValidation(): Promise<ElementFinder> {
    return $('#password+.validation');
  }

  async getStatus(): Promise<ElementFinder> {
    return $('.status');
  }

  async submitForm(): Promise<ElementFinder> {
    return $('#submit').click();
  }
}
