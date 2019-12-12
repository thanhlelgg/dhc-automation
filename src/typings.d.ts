import 'gondolajs';
import { ILocation } from 'selenium-webdriver';

interface String {
    format(...args: string[]): string;
}

declare module 'gondolajs' {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface IGondola {
        /**
         *Check if all options exist
         * @param control
         * @param options
         */
        areOptionsExists(control: any, options: string[]): Promise<boolean>;
        /**
         * Enter text and accept alert if available
         * @param control
         * @param text
         */
        controlPopupAndEnterText(control: any, text: string): Promise<void>;

        /**
         * Scroll to an element
         * @param control
         */
        scrollToElement(control: any): Promise<void>;

        /**
         * Execute a javascript click
         * @param control
         */
        executeClick(control: any): Promise<void>;

        /**
         * Find elements using protractor directly
         * @param locator
         */
        performClick(locator: any, offset?: ILocation): Promise<void>;

        /**
         * Get attributes of all elements match the locator
         * @param control
         * @param attribute
         */
        getElementsAttributes(control: any, attribute: string): Promise<string[]>;

        /**
         * Check if an element is displayed
         * @param control
         */
        doesControlDisplay(control: any): Promise<boolean>;

        /**
         * Check if an element is checked
         * @param control
         */
        doesCheckboxChecked(control: any): Promise<boolean>;

        /**
         * Check if an element is enabled
         * @param control
         */
        isControlEnabled(control: any): Promise<boolean>;

        /**
         * Get attribute from an element
         * @param control
         * @param attribute
         */
        getElementAttribute(control: any, attribute: string): Promise<string>;
        /**
         * Wait until element not visible
         * @param control
         */
        waitUntilElementNotVisible(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait until element exist
         * @param control
         */
        waitUntilElementExist(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait for staleness of element
         * @param control
         */
        waitUntilStalenessOfElement(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait until element visible
         * @param control
         * @param attribute
         */
        waitUntilElementVisible(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait until text visible in textfield
         * @param control
         * @param attribute
         */
        waitUntilTextAvailable(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait for alert present
         * @param timeOut
         */
        waitForAlert(timeOut?: number): Promise<void>;

        /**
         * Press a key
         * @param key
         */
        pressKey(key: string): Promise<void>;

        /**
         * Move to an element
         * @param control
         */
        moveToElement(control: any): Promise<void>;

        /**
         * Get HTML 5 validation message
         * @param control
         */
        getValidationMessage(control: any): Promise<string>;

        /**
         * Click and return if clicked
         * @param control
         */
        awaitClick(control: any): Promise<boolean>;
        /**
         * Get selected option of a dropdown
         * @param control
         */
        getSelectedOption(control: any): Promise<string>;
    }
}
