import { action } from 'gondolajs/built/deco';
import { ProtractorBrowser } from 'protractor';
import * as dotenv from 'dotenv';
import * as protractor from 'protractor';
import { ILocation } from 'selenium-webdriver';

// this helper always run before executing testcase, we will preload environment variable in here
// if we need to use environment variable before this, we should find another place for it
dotenv.config();
declare let browser: ProtractorBrowser;
const DEFAULT_TIMEOUT = 5;

class HelperExt extends Helper {
    @action('does popup exist', 'test if a popup exist')
    public async controlPopupAndEnterText(control: any, text: string): Promise<void> {
        try {
            await this.helpers['GondolaHelper'].enter(control, text);
        } catch (e) {
            const popupText = await this.helpers['GondolaHelper'].getPopupText();
            if (popupText != null) {
                await this.helpers['GondolaHelper'].clickPopup('ok');
                await this.helpers['GondolaHelper'].enter(control, text);
            }
        }
    }

    /**
     * Get current browser
     */
    public async getCurrentBrowser(): Promise<ProtractorBrowser> {
        return await browser;
    }

    /**
     * Find element using protractor directly
     * @param locator
     */
    public async getElement(locator: any): Promise<protractor.WebElement> {
        if (typeof locator === 'string') {
            locator = { xpath: locator };
        }
        return await browser.findElement(locator);
    }

    /**
     * Scroll to an element
     * @param locator
     */
    public async scrollToElement(control: any): Promise<void> {
        const element = await this.getElement(control);
        await browser.executeScript('arguments[0].scrollIntoView(true)', element);
    }

    /**
     * Find elements using protractor directly
     * @param locator
     */
    public async getElements(locator: any): Promise<protractor.WebElement[]> {
        if (typeof locator === 'string') {
            locator = { xpath: locator };
        }
        return await browser.findElements(locator);
    }

    /**
     * Find elements using protractor directly
     * @param locator
     */
    public async performClick(locator: any, offset?: ILocation): Promise<void> {
        if (typeof locator === 'string') {
            locator = { xpath: locator };
        }
        if (offset) {
            await browser
                .actions()
                .mouseMove(await this.getElement(locator))
                .mouseMove(offset)
                .click()
                .perform();
        } else {
            await browser
                .actions()
                .mouseMove(await this.getElement(locator))
                .click()
                .perform();
        }
    }

    /**
     * Get attributes of all elements match the locator
     * @param control
     * @param attribute
     */
    public async getElementsAttributes(control: any, attribute: string): Promise<string[]> {
        const elements = await this.getElements(control);
        const elementsAttribute = [];
        for (const element of elements) {
            elementsAttribute.push(await element.getAttribute(attribute));
        }
        return elementsAttribute;
    }

    /**
     * Check if all options available in dropdown box
     * @param control
     * @param options
     */
    public async areOptionsExists(control: any, options: string[]): Promise<boolean> {
        const elements = await this.getOptions(control);
        for (const element of elements) {
            const optionText = await element.getText();
            if (!options.includes(optionText)) {
                console.log(`Option: ${optionText} does not exist`);
                return false;
            }
        }
        return true;
    }

    /**
     * Get available options from dropdown box
     * @param control
     */
    public async getOptions(control: any): Promise<protractor.WebElement[]> {
        return await (await this.getElement(control)).findElements({ css: 'option' });
    }

    /**
     * Check if an element is displayed
     * @param control
     */
    public async doesControlDisplay(control: any): Promise<boolean> {
        return await (await this.getElement(control)).isDisplayed();
    }

    /**
     * Check if an element is enabled
     * @param control
     */
    public async isControlEnabled(control: any): Promise<boolean> {
        return await (await this.getElement(control)).isEnabled();
    }

    /**
     * Get attribute from an element
     * @param control
     * @param attribute
     */
    public async getElementAttribute(control: any, attribute: string): Promise<string> {
        return await (await this.getElement(control)).getAttribute(attribute);
    }

    /**
     * Wait until element not visible
     * @param control
     */
    public async waitUntilElementNotVisible(control: any, timeOut = DEFAULT_TIMEOUT): Promise<void> {
        timeOut = timeOut * 1000; //convert to milliseconds
        const element = await this.getElement(control);
        await browser.wait(protractor.until.elementIsNotVisible(element), timeOut);
    }

    /**
     * Wait until element exist
     * @param control
     */
    public async waitUntilElementExist(control: any, timeOut = DEFAULT_TIMEOUT): Promise<void> {
        timeOut = timeOut * 1000; //convert to milliseconds
        const element = await this.getElement(control);
        await browser.wait(protractor.until.elementLocated(element), timeOut);
    }

    /**
     * Wait for staleness of element
     * @param control
     */
    public async waitUntilStalenessOfElement(control: any, timeOut = DEFAULT_TIMEOUT): Promise<void> {
        timeOut = timeOut * 1000; //convert to milliseconds
        const element = await this.getElement(control);
        try {
            await browser.wait(protractor.until.stalenessOf(element), timeOut);
        } catch (error) {
            console.log(`Element is not staleness after ${timeOut} ms`);
        }
    }

    /**
     * Wait until element visible
     * @param control
     * @param attribute
     */
    public async waitUntilElementVisible(control: any, timeOut = DEFAULT_TIMEOUT): Promise<void> {
        timeOut = timeOut * 1000; //convert to milliseconds
        const element = await this.getElement(control);
        try {
            await browser.wait(protractor.until.elementIsVisible(element), timeOut);
        } catch (TimeoutError) {
            console.log(`Can not find element with locator ${control} after ${timeOut} ms`);
        }
    }

    /**
     * Wait for alert present
     * @param timeOut
     */
    public async waitForAlert(timeOut = DEFAULT_TIMEOUT): Promise<void> {
        timeOut = timeOut * 1000; //convert to milliseconds
        await browser.wait(protractor.until.alertIsPresent(), timeOut);
    }
}
module.exports = HelperExt;
