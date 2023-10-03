const {authenticatedTest, expect } = require('./setup.js');
authenticatedTest("Add and remove items from cart.", async ({authenticatedPage}) =>{
    await authenticatedPage.goto("/inventory.html");

    let addedItemName;
    let item;
    let inventoryButton;

    await authenticatedTest.step("Find first item and add to cart", async () => {
        item = await authenticatedPage.locator(".inventory_item").first();
        addedItemName = await item.locator(".inventory_item_name").textContent();

        inventoryButton = item.locator(".btn_inventory");
        await inventoryButton.click();
    })

    await authenticatedTest.step("Check if cart number went up", async () => {
        let cartNumber = await authenticatedPage.locator(".shopping_cart_badge").textContent();

        expect(parseInt(cartNumber) === 1).toBeTruthy();
    })

    await authenticatedTest.step("Remove item from cart", async () => {
        await inventoryButton.click();
    })

    await authenticatedTest.step("Check if cart number went down (badge hidden)", async () => {
        await expect(authenticatedPage.locator(".shopping_cart_badge")).not.toBeVisible
    })

    await authenticatedTest.step("Readd item to cart", async() => {
        await inventoryButton.click();
    })

    await authenticatedTest.step("Navigate to cart", async() => {
        await authenticatedPage.locator(".shopping_cart_link").click();
        await expect(authenticatedPage).toHaveURL("/cart.html");
    })

    await authenticatedTest.step("Check if added item in cart", async() => {
        let nameOfCartItem = await authenticatedPage.locator(".inventory_item_name").first().textContent();
        expect(nameOfCartItem === addedItemName).toBeTruthy();
    })
  })