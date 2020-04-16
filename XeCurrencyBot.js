// useful docs > https://www.selenium.dev/selenium/docs/api/javascript/index.html

const { Builder, By, Key, until } = require("selenium-webdriver");
const { openBrowser, getTableValues } = require("./BrowserActivities");

const nzdToUsd = async (amount, fromCurrencyCode, toCurrencyCode) => {
  try {
    const chromeXe = await openBrowser("chrome", "https://www.xe.com/");

    const amountInputField = await chromeXe.selectElement("//*/input[@id='amount']");
    await amountInputField.sendKeys(amount);

    const fromCurrencyLabel = await chromeXe.selectElement("//*[@id='converterForm']//*/label[@for='from']");
    await fromCurrencyLabel.click();
    const fromCurrencyField = await chromeXe.switchTo().activeElement();
    await fromCurrencyField.sendKeys(fromCurrencyCode);
    await fromCurrencyField.sendKeys(Key.ENTER);

    const toCurrencyLabel = await chromeXe.selectElement("//*[@id='converterForm']//*/label[@for='to']");
    await toCurrencyLabel.click();
    const toCurrencyField = await chromeXe.switchTo().activeElement();
    await toCurrencyField.sendKeys(toCurrencyCode);
    await toCurrencyField.sendKeys(Key.ENTER);

    const submitButton = await chromeXe.selectElement("//*/button[@type='submit']");
    await submitButton.click();

    const converterResult = await chromeXe.selectElement("//*/span[@class='converterresult-toAmount']");
    const amountInUsd = await converterResult.getAttribute("innerText");

    chromeXe.quit();

    return amountInUsd;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

const scrapeXeCurrencyTable = async currencyCode => {
  try {
    const chromeXe = await openBrowser("chrome", `https://www.xe.com/currencytables/?from=${currencyCode}`);
    const currencyConversionTableElement = await chromeXe.selectElement("//*/table[@id='historicalRateTbl']");
    const currencyConversionTableValues = await getTableValues(currencyConversionTableElement);
    chromeXe.quit();
    return currencyConversionTableValues;
  } catch (error) {
    console.error(error);
  }
};

// nzdToUsd(30, "NZD", "GBP").then(
//   res => console.log("Amount in new currency: " + res),
//   error => console.error(error)
// );

scrapeXeCurrencyTable("NZD").then(
  res => console.log(res),
  error => console.error(error)
);
