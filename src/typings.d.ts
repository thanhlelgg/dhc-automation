import 'gondolajs/built/builtin';
import { ILocation } from 'selenium-webdriver';

interface String {
    format(...args: string[]): string;
}

declare module 'gondolajs/built/builtin' {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    export interface IGondolaWeb {
        /**
         *Check if all options exist
         * @param control
         * @param options
         */
        areOptionsExists(control: any, options: string[]): Promise<boolean>;
        /**
         * Get dropdown option by index
         * @param control
         * @param idx: index of option, start from 0
         */
        getOptionByIndex(control: any, idx: number): Promise<string>;
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
         * Scroll to top
         */
        scrollToTop(): Promise<void>;

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
         * @param normalize Remove leading and trailing whitespace or not
         */
        getElementsAttributes(control: any, attribute: string, normalize?: boolean): Promise<string[]>;

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
         * @param timeOut
         */
        waitUntilElementNotVisible(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait until element exist
         * @param control
         * @param timeOut
         */
        waitUntilElementExist(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait for staleness of element
         * @param control
         * @param timeOut
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

        /**
         * Check if condition is true
         * @param isTrue
         * @param errorMessage
         */
        checkTrue(isTrue: boolean, errorMessage?: string): void;

        /**
         * Check if condition is false
         * @param isTrue
         * @param errorMessage
         */
        checkFalse(isTrue: boolean, errorMessage?: string): void;

        /**
         * Wait until element exists in DOM, don't throw exception if it's not
         * @param control
         * @param timeOut
         */
        waitForElementSoftly(control: any, timeOut?: number): Promise<void>;

        /**
         * Wait until element removed from DOM, don't throw exception if it's not
         * @param control
         * @param timeOut
         */
        waitForElementDisappearSoftly(control: any, timeOut?: number): Promise<void>;

        /**
         * get current url of web
         */
        getCurrentUrl(): Promise<string>;

        /**
         * Send keys to an input
         * @param control
         * @param text
         */
        sendKeys(control: any, text: string): Promise<void>;

        /**
         * Wait until file exists
         * @param filePath
         * @param timeOut
         */
        waitUntilFileExists(filePath: string, timeOut?: number): Promise<void>;

        /**
         * Wait until condition correct
         * @param condition
         * @param timeOut
         */
        waitUntilConditionCorrect(condition: Function | PromiseLike<boolean>, timeOut?: number): Promise<void>;

        /**
         * Set attribute of an element using javascript
         * @param control
         * @param attribute
         * @param value
         */
        setElementAttribute(control: any, attribute: string, value: string): Promise<void>;

        /**
         * Select Option by text (temporary replaced for 'gondola.select' which is bugged)
         * @param control
         * @param text
         */
        selectOptionByText(control: any, text: string): Promise<void>;
    }
}
