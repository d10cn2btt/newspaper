import { ClientMigratePage } from './app.po';

describe('client-migrate App', function() {
  let page: ClientMigratePage;

  beforeEach(() => {
    page = new ClientMigratePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
