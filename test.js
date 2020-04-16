require("dotenv").config();

const credentials = JSON.parse(process.env.DUMMY_CREDENTIALS);

console.log(credentials);
