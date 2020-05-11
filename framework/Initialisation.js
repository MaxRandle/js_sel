const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

const initConfig = async () => {
  try {
    return require("./config.json");
  } catch (error) {
    console.log(error);
  }
};
/**
 *
 * @param {object} config
 * @return {object<driver>}
 */
const initApplications = async (config) => {
  try {
    // initialise applications here
    const applications = {};
    return applications;
  } catch (error) {
    console.log(error);
  }
};

const closeAllApplications = async (applications) => {
  try {
    Object.values(applications).forEach((application) => application.quit());
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initConfig,
  initApplications,
};
