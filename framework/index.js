// Probotics framework for selenium transactional robots
// useful docs > https://www.selenium.dev/selenium/docs/api/javascript/index.html

const { initConfig, initApplications } = require("./Initialisation");

const main = async () => {
  try {
    let firstRun = true;
    const config = await initConfig();
    const applications = await initApplications();
  } catch (error) {
    console.log(error);
  }
};

main();
