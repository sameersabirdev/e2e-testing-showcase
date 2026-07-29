/**
 * Central test data for the Playwright suite.
 *
 * Kept in one typed module so a change to credentials or expected copy
 * updates every spec at once, and the type system flags typos at compile time.
 */

export interface User {
  username: string;
  password: string;
}

export const users: Record<string, User> = {
  standard: { username: "standard_user", password: "secret_sauce" },
  lockedOut: { username: "locked_out_user", password: "secret_sauce" },
  problem: { username: "problem_user", password: "secret_sauce" },
  performanceGlitch: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  invalid: { username: "no_such_user", password: "wrong_password" },
};

export const checkoutCustomer = {
  firstName: "Sameer",
  lastName: "Sabir",
  postalCode: "54000",
};

export const products = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
  boltTshirt: "Sauce Labs Bolt T-Shirt",
};

export const messages = {
  lockedOut: "Epic sadface: Sorry, this user has been locked out.",
  invalidCredentials:
    "Epic sadface: Username and password do not match any user in this service",
  missingUsername: "Epic sadface: Username is required",
  missingPassword: "Epic sadface: Password is required",
  checkoutComplete: "Thank you for your order!",
};
