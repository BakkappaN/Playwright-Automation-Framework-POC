import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
    async selectTransactionType(type: string) {
        await this.page.getByLabel('Transaction Type:').selectOption(type);
    }

    async fillTransactionDetails(amount: string, account: string, description: string) {
        await this.page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill(amount);
        await this.page.getByRole('textbox', { name: 'Transfer to Account: *' }).fill(account);
        await this.page.getByRole('textbox', { name: 'Description: *' }).fill(description);
    }

    async submitTransaction() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }

    async getTransactionReference(): Promise<string> {
        const transactionRefNumber = await this.page.getByText('Transaction Reference: TXN-').textContent();
        const finalTxnNo = transactionRefNumber!.replace('Transaction Reference:', '');
        return finalTxnNo;
    }
}
