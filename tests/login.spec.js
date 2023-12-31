const { test, authenticatedTest, expect } = require('./setup.js');

test('Can log in with valid information', async ({ page, validUsername, correctPassword }) => {
  await page.goto('/');

  await test.step("Fill fields with valid information", async () => {
    let usernameField = page.getByTestId("username");
    let passwordField = page.getByTestId("password");
  
    await usernameField.fill(validUsername);
    await passwordField.fill(correctPassword);
  })

  await test.step("Find and click submit button", async () => {
    let submitButton = page.getByTestId("login-button");

    await submitButton.click();
  })

  await test.step("Redirect to inventory page", async () => {
    await expect(page).toHaveURL("/inventory.html");
  })
});

test("Displays a message in case account is locked", async({page, lockedUsername, correctPassword}) => {
  await page.goto("/");

  await test.step("Fill fields with information of locked account", async () => {
    let usernameField = page.getByTestId("username");
    let passwordField = page.getByTestId("password");
  
    await usernameField.fill(lockedUsername);
    await passwordField.fill(correctPassword);
  })

  await test.step("Find and click submit button", async () => {
    let submitButton = page.getByTestId("login-button");

    await submitButton.click();
  })

  await test.step("Display message to user about account status", async () => {
    let errorHolder = page.getByTestId("error");

    let textContent = await errorHolder.textContent();

    expect(textContent.includes("locked")).toBeTruthy();
  })
})

test("Rejects unauthenticated user from viewing gated page", async ({page}) =>{
  await page.goto("/inventory.html");
  await expect(page).toHaveURL("/");
})

test("Logs returning user back in automatically", async({page, context, cookieName, cookieValue}) => {
  await test.step("Add cookie to browser", async () => {
    let cookie = [{name:cookieName, value:cookieValue, url:process.env.baseURL, secure: false, hostOnly : true, sameSite: "None"}];

    await context.addCookies(cookie);
  })

  await test.step("Navigate to authentication gated page and stay", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL("/inventory.html");
  })
})

// Alternative, less clear way of testing the previous case, using an authentication fixture
// authenticatedTest("Logs returning user back in automatically", async({authenticatedPage}) => {
//   await authenticatedTest.step("Navigate to authentication gated page and stay", async () => {
//     await authenticatedPage.goto("/inventory.html");
//     await expect(authenticatedPage).toHaveURL("/inventory.html");
//   })
// })