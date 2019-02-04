import { MyfirstappPage } from './app.po';

describe('myfirstapp App', function() {
  let page: MyfirstappPage;

  beforeEach(() => {
    page = new MyfirstappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
