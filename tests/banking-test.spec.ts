import { test, expect } from "../fixtures/TestFixture";
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

import config from '../config.json';
import transferData from '../test-data/Transfer_TestData.json';

test('Verify Quick Transactions Flow', async ({ page, loginPage, homePage, quickTransactionPage, transactionHistoryPage }) => {

    let txnRef: string;

    await test.step('Login to the application', async () => {
        await loginPage.loginToApplication(config.url, config.username, config.password, config.appName);
    });

    await test.step('Home Page Verification', async () => {
        await homePage.verifyHomePage();
    });

    await test.step('Quick Transaction Flow', async () => {
        await homePage.clickQuickTransactions();
        await quickTransactionPage.selectTransactionType(transferData.transactionType);
        await quickTransactionPage.fillTransactionDetails(transferData.amount.toString(),
            transferData.transferToAccount, transferData.description
        );
        await quickTransactionPage.submitTransaction();
        txnRef = await quickTransactionPage.getTransactionReference();
        expect(txnRef).toMatch(/TXN-\d+/);
    });

    await test.step('Transaction History Verification', async () => {
        await transactionHistoryPage.openHistory();
        await transactionHistoryPage.verifyTransactionReference(txnRef);
    });
});

test('Verify tab names in the homepage', async ({ page, loginPage, homePage, }) => {

    await test.step('Login to the application', async () => {
        await loginPage.loginToApplication(config.url, config.username, config.password, config.appName);
    });

    await test.step('Home Page Verification', async () => {
        await homePage.verifyHomePage();
    });

    await test.step('Check that Transfers & Bill Payment tabs are visible', async () => {
        await expect(page.getByRole('button', { name: 'Transfers' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Bill Payments' })).toBeVisible();
    });
});
