describe('WebdriverIO and Appium, when interacting with a login form,', () => {
  beforeEach(async () => {
    const element = await $("~counter-button");
    await element.click();
    await element.click();
    await element.click();
  });

  it('text should be counter-button', async () => {
    const title = await $('~counter-button').getText();
    expect(title).toBe('counter-button');
  });
});
