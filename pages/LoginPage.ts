import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    async loginToApplication(url: string, username: string, password: string, appName: string) {
        await this.goto(url);
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByLabel('App Name:').selectOption(appName);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}
