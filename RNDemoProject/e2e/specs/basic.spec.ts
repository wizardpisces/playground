describe('WebdriverIO and Appium basic test', () => {
  beforeEach(async () => {
   
  });

  it('text should be counter-button', async () => {
    const title = await $('~counter-button').getText();
    expect(title).toBe('counter-button');
  });

  it('text should be 0', async () => { // this test will fail
    const title = await $('~counter-button').getText();
    expect(title).toBe('0');
  });
});

describe('WebdriverIO and Appium basic test 2', () => {
  it('click counter-button 3 times', async () => {
    const element = await $("~counter-button");
    await element.click();
    await element.click();
    await element.click();
  });
});
