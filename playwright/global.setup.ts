import { test as setup, expect } from "@playwright/test";
import { users } from "./fixtures/test-data";
import path from "path";

const authFile = path.join(__dirname, ".auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("username").fill(users.standard.username);
  await page.getByTestId("password").fill(users.standard.password);
  await page.getByTestId("login-button").click();
  await page.waitForURL(/inventory\.html/);

  await page.context().storageState({ path: authFile });
});
