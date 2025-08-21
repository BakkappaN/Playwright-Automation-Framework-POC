import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    async login(username: string, password: string, appName: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByLabel('App Name:').selectOption(appName);
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.page.waitForNavigation({ timeout: 10000 });
    }
}
