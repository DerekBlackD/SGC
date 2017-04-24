import { browser, element, by } from 'protractor';

export class ET.CRM.SGCPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
