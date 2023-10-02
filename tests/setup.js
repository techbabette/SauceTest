const { test, expect } = require('@playwright/test');
import dotenv from "dotenv";

let cookieName = "session-username";
let cookieValue = "standard_user";

dotenv.config();
const myTest = test.extend({
    /*
    Reading secret information from env file.
    Kept the env file visible as this project is only for practice purposes.
    */
    validUsername: process.env.validUsername,
    correctPassword: process.env.correctPassword,
    lockedUsername: process.env.lockedUsername,
    cookieName,
    cookieValue
})

const authenticatedTest = test.extend({
  authenticatedPage: async({page}, use) => {
    let cookie = [{name:cookieName, value:cookieValue, url:process.env.baseURL, secure: false, hostOnly : true, sameSite: "None"}];

    await page.context().addCookies(cookie);

    await use(page);
  }
})

exports.test = myTest;
exports.authenticatedTest = authenticatedTest;
exports.expect = expect;