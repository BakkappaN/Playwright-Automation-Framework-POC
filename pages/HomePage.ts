import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    async verifyHomePage() {
        await this.page.waitForURL(/Banking-Project-Demo.html/, { timeout: 10000 });
        await expect(this.page.getByRole('heading', { name: '🏦 Sample Banking Application' })).toBeVisible();
        await expect(this.page.getByText('Welcome to the Testers Talk Banking Application')).toBeVisible();
    }

    async clickQuickTransactions() {
        await this.page.getByRole('link', { name: '💳 Quick Transactions' }).click();
    }
}
