const { Builder, By, Key, until } = require("selenium-webdriver");

const openBrowser = async (browserString, url) => {
  /**
   * @param {string} browserString The name of browser
   * @return {!Promise<?driver>} returns promise that will be resolved with the driver object
   */
  try {
    let driver = await new Builder().forBrowser(browserString).build();
    driver.selectElement = (xpath, timeout = 10000) => driver.wait(until.elementLocated(By.xpath(xpath), timeout));
    await driver.get(url);
    return driver;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {WebElement} table the webelement containing a simply structured table
 * @return {!Promise<?Array[Array[String]]>} a 2D array containing all of the innerText of a table
 */
const getTableValues = async table => {
  try {
    const tableHeaders = await table.findElements(By.xpath("//thead/tr/th"));
    const columnCount = tableHeaders.length;
    const tableCells = await table.findElements(By.xpath("//tbody/tr/td"));
    const tableCellValuesFlat = await Promise.all(tableCells.map(cell => cell.getAttribute("innerText")));
    const tableCellValues = [];
    while (tableCellValuesFlat.length) tableCellValues.push(tableCellValuesFlat.splice(0, columnCount));
    return tableCellValues;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  openBrowser: openBrowser,
  getTableValues: getTableValues
};

// element.setAttribute = (attribute, value) => {
//   if (attribute === "value") driver.executeScript("arguments[0].value = arguments[1];", element, value);
//   else driver.executeScript("arguments[0].setAttribute(arguments[1], arguments[2]);", element, attribute, value);
// };

// return{
//   currencyName: textRow[0],
//   currencyCode: textRow[1],
//   unitsPerCurrency: textRow[2],
//   currencyPerUnits: textRow[3]
// };
