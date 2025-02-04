const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should fill the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
       })

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const parentElement = await page.selectSupportive();
        await expect (parentElement).toHaveElementClass("active");
        });

        it('should submit the phone number', async () => {    
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        });

        it('should add a card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addPaymentMethodCard();
        
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await cardPaymentMethodIcon.waitForDisplayed();
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();
        });

        it('should add a message for driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = "Waiting outside";
        await page.addMessageToTheDriver(message);
        await expect($(page.messageToTheDriverField)).toHaveValue(message);
        });

        it('should add blanket and hankerchief', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.addBlanketAndHankerchief();
            await expect($(page.blanketAndHankerchiefSlider)).toBeChecked(); 
        });

        it('should add two ice creams', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            const iceCream = await $(page.iceCreamButton);
            await iceCream.waitForDisplayed();
            await iceCream.click(); 
            await iceCream.click();
            await expect(await $('div=2')).toBeExisting();         
});

        it('car modal should appear', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            const orderButton = await $(page.orderButton);
            await orderButton.waitForDisplayed();
            await orderButton.click();
            const carModal = await $(page.carSearchModal);
            await carModal.waitForDisplayed();
            await expect(carModal).toBeExisting();
});
});

