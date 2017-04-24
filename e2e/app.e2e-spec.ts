import { ET.CRM.SGCPage } from './app.po';

describe('et.crm.sgc App', () => {
  let page: ET.CRM.SGCPage;

  beforeEach(() => {
    page = new ET.CRM.SGCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
