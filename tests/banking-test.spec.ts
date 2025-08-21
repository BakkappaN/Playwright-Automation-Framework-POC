import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import config from '../config.json';

import transferData from '../test-data/Transfer_TestData.json';

test('Verify Quick Transactions Flow', async ({ page }) => {
    // Page Object Instantiations
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const quickTransactionPage = new QuickTransactionPage(page);
    const transactionHistoryPage = new TransactionHistoryPage(page);

    // Step 1: Login
    await loginPage.goto(config.url);
    await loginPage.login(config.username, config.password, config.appName);

    // Step 2: Home Page Verification
    await homePage.verifyHomePage();

    // Step 3: Quick Transaction Flow
    await homePage.clickQuickTransactions();
    await quickTransactionPage.selectTransactionType(transferData.transactionType);
    await quickTransactionPage.fillTransactionDetails(
        transferData.amount.toString(),
        transferData.transferToAccount,
        transferData.description
    );
    await quickTransactionPage.submitTransaction();
    const txnRef = await quickTransactionPage.getTransactionReference();
    expect(txnRef).toMatch(/TXN-\d+/);

    // Step 4: Transaction History Verification
    await transactionHistoryPage.openHistory();
    await transactionHistoryPage.verifyTransactionReference(txnRef);
});

test('Verify tab names in the homepage', async ({ page }) => {
    // Instantiate page objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Step 1: Navigate to login page
    await loginPage.goto(config.url);

    // Step 2: Login
    await loginPage.login(config.username, config.password, config.appName);

    // Step 3: Verify home page loads
    await homePage.verifyHomePage();

    // Step 4: Check that Transfers & Bill Payment tabs are visible
    await expect(page.getByRole('button', { name: 'Transfers' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bill Payments' })).toBeVisible();
});
