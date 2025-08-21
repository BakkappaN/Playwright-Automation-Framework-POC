import { Page } from '@playwright/test';
import { CommonSelector } from '../selectors/Common.json';
import { Common } from '../constants/Common.json';

export async function loginToApplication(page: Page, username: string, password: string, appName: string) {
    try {
        const appURL = await getURL();
        console.log(`Navigating to application URL: ${appURL}`);
        if (!appURL) {
            throw new Error('Application URL is not defined for the current environment.');
        }
        await page.goto(appURL);
        await page.getByRole('textbox', { name: CommonSelector.Textbox.Username }).fill(username);
        await page.getByRole('textbox', { name: CommonSelector.Textbox.Password }).fill(password);
        await page.getByLabel(CommonSelector.Label.AppName).selectOption(appName);
        await page.getByRole('button', { name: CommonSelector.Buttons.Login }).click();
    } catch (error) {
        console.log(`Error while logging in: ${(error as Error).message}`);
        throw error;
    }
}

export async function getURL(): Promise<string> {
    let url: string = "";
    let environment = await `${process.env.ENVIRONMENT}`.toUpperCase();
    console.log(`Current environment: ${environment}`);
    try {
        if (environment === 'DEV') {
            url = Common.URL.DevURL;
        } else if (environment === 'TEST') {
            url = Common.URL.TestURL;
        }
        return url;
    } catch (error) {
        console.log(`Error while logging in: ${(error as Error).message}`);
        throw error;
    }
}

