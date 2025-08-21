import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
    async openHistory() {
        await this.page.getByRole('button', { name: 'View History' }).click();
    }

    async verifyTransactionReference(ref: string) {
        const txnHistory = await this.page.locator('#transactionHistory').textContent();
        expect(txnHistory?.trim()).toContain(ref.trim());
    }
}
