import { test, expect } from '@playwright/test';
import { TransfersWebService } from '../services/TransfersWebService';
import { loginToApplication } from '../utils/Login';
import { Common } from '../constants/Common.json';
import transferData from '../test-data/Transfer_TestData.json';
import { DropDownList } from '../constants/DropDownList.json';

test('Verify Quick Transactions Flow', async ({ page }) => {

    const transfersWebService = new TransfersWebService(page);
    let txnRef: string;

    await test.step('Login to the application', async () => {
        await loginToApplication(page, Common.TestUsers.UserName, Common.TestUsers.Password, Common.Appname.Banking);
    });

    await test.step('Navigate to Quick Transaction', async () => {
        await transfersWebService.verifyHomePage();
        await transfersWebService.clickQuickTransactions();
    });

    await test.step('Create a Quick Transaction', async () => {
        await transfersWebService.createQuickTransaction(DropDownList.TrnsactionType.Transfer,
            transferData.amount, transferData.transferToAccount, transferData.description);
    });

    await test.step('Verify Quick Transaction number', async () => {
        txnRef = await transfersWebService.getTransactionReference();
        expect(txnRef).toMatch(/TXN-\d+/);
    });

    await test.step('Verify transaction in transaction history', async () => {
        await transfersWebService.openTransactionHistory();
        await transfersWebService.verifyTransactionReference(txnRef);
    });
});


