module.exports = {
  'Demo test': (browser) => {
    browser
      .url('http://localhost:5050')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:5050/')
      .end();
  }
}
;
