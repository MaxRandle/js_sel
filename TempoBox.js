const { Builder, By, Key, until } = require("selenium-webdriver");
const { openBrowser, getTableValues } = require("./BrowserActivities");

require("dotenv").config();
const tempoboxUsername = process.env.TEMPOBOX_USERNAME;
const tempoboxPassword = process.env.TEMPOBOX_PASSWORD;
const tempoboxLoginUrl = process.env.TEMPOBOX_LOGIN_URL;

const tempoBox = async () => {
  try {
    // get driver
    const chromeTempo = await openBrowser("chrome", tempoboxLoginUrl);

    // log in
    const [usernameField, passwordField, signInButton] = await Promise.all([
      chromeTempo.selectElement("//*[@id='loginName']"),
      chromeTempo.selectElement("//*[@id='loginPwd']"),
      chromeTempo.selectElement("//*[@id='loginButton']"),
    ]);
    await Promise.all([usernameField.sendKeys(tempoboxUsername), passwordField.sendKeys(tempoboxPassword)]);
    await signInButton.click();

    //navigate to folder
    const folderLink = await chromeTempo.selectElement(
      "//*/a[@title='Open Holiday act – probity [shared with externals]']"
    );
    folderLink.click();

    const folder2Link = await chromeTempo.selectElement("//*/a[@title='Open Remediation data fortnightly']");
    folder2Link.click();

    // // download dummy file
    // const fileName = "test.txt";
    // // const allFilesDownloadLinksArray = await chromeTempo.selectElement(
    // //   `//*/div[contains(@id, 'browseFile')]/*//a[@class='objectDownload']`
    // // );
    // const downloadLink = await chromeTempo.selectElement(
    //   `//*/div[contains(@id, 'browseFile')]//*/a[contains(@title, '${fileName}')]`
    // );
    // const checkBox = await chromeTempo.selectElement(
    //   `//*/div[contains(@id, 'browseFile')]//*/a[contains(@title, '${fileName}')]`
    // );
    // // await downloadLink.click();
    // console.log(downloadLink);

    // quit Tempobox
    // chromeTempo.quit();
  } catch (err) {
    console.warn(err);
  }
};

tempoBox();
