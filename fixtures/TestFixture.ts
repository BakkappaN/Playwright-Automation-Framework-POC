import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';

export const test = base.extend<{
    saveLogs: void;
    loginPage: LoginPage;
    homePage: HomePage;
    quickTransactionPage: QuickTransactionPage;
    transactionHistoryPage: TransactionHistoryPage;
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    quickTransactionPage: async ({ page }, use) => {
        const quickTransactionPage = new QuickTransactionPage(page);
        await use(quickTransactionPage);
    },
    transactionHistoryPage: async ({ page }, use) => {
        const transactionHistoryPage = new TransactionHistoryPage(page);
        await use(transactionHistoryPage);
    }
});

export { expect } from '@playwright/test';