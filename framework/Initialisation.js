const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

const initConfig = async () => {
  try {
    return require("./config.json");
  } catch (error) {
    console.log(error);
  }
};

const initApplications = async config => {
  try {
    // initialise applications here
    const applications = {};
    return { ...applications };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initConfig,
  initApplications
};
