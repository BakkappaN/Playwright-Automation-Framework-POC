import { Page, expect } from "@playwright/test";
import { ExpectedResult } from '../constants/Validations.json';
import { TransfersSelector } from '../selectors/Transfers.json';

export class TransfersWebService {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyHomePage(): Promise<void> {
        try {
            // await this.page.waitForURL(ExpectedResult.BankingAppURL, { timeout: 10000 });
            await expect(this.page.getByRole('heading', { name: ExpectedResult.HeaderText })).toBeVisible();
            await expect(this.page.getByText(ExpectedResult.WelcomeMsg)).toBeVisible();
        } catch (error) {
            console.log(`Error while validating home page: ${(error as Error).message}`);
            throw error;
        }
    }

    async clickQuickTransactions(): Promise<void> {
        try {
            await this.page.getByRole('link', { name: TransfersSelector.Links.QuickTransactions }).click();
        } catch (error) {
            console.log(`Error while validating home page: ${(error as Error).message}`);
            throw error;
        }
    }

    async createQuickTransaction(type: string, amount: string, account: string, description: string) {
        try {
            await this.page.getByLabel(TransfersSelector.Label.TransactionType).selectOption(type);
            await this.page.getByRole('spinbutton', { name: TransfersSelector.Buttons.Amount }).fill(amount);
            await this.page.getByRole('textbox', { name: TransfersSelector.Textbox.TransferAccount }).fill(account);
            await this.page.getByRole('textbox', { name: TransfersSelector.Textbox.Description }).fill(description);
            await this.page.getByRole('button', { name: TransfersSelector.Buttons.Submit }).click();
            await this.page.getByRole('button', { name: TransfersSelector.Buttons.Confirm }).click();
        } catch (error) {
            console.log(`Error while validating home page: ${(error as Error).message}`);
            throw error;
        }
    }

    async getTransactionReference(): Promise<string> {
        try {
            const transactionRefNumber = await this.page.getByText(TransfersSelector.Text.TransactionReference).textContent();
            const finalTxnNo = transactionRefNumber!.replace('Transaction Reference:', '');
            console.log(`Transaction Reference Number: ${finalTxnNo}`);
            return finalTxnNo;
        } catch (error) {
            console.log(`Error while getting transaction number: ${(error as Error).message}`);
            throw error;
        }
    }

    async openTransactionHistory(): Promise<void> {
        await this.page.getByRole('button', { name: TransfersSelector.Buttons.ViewHistory }).click();
    }

    async verifyTransactionReference(ref: string): Promise<void> {
        const txnHistory = await this.page.locator(TransfersSelector.CSS.TransactionHistory).textContent();
        console.log(`Transaction History: ${txnHistory}`);
        expect(txnHistory?.trim()).toContain(ref.trim());
    }
}