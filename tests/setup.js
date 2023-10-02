const { test, expect } = require('@playwright/test');
import dotenv from "dotenv";

dotenv.config();
const myTest = test.extend({
      /*
    Reading secret information from env file.
    Kept the env file visible as this project is only for practice purposes.
    */
    validUsername: process.env.validUsername,
    correctPassword: process.env.correctPassword,
    lockedUsername: process.env.lockedUsername,
    cookieName: "session-username",
    cookieValue: "standard_user"
})

exports.test = myTest;
exports.expect = expect;