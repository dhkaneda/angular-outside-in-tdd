import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getAppHeader(): Promise<string> {
    return element(by.css('.App-header')).getText() as Promise<string>;
  }
  
  getRecipePlaceholderText(): Promise<string> {
    return element(by.tagName('p')).getText() as Promise<string>;
  }

  getAddRecipeButton(): ElementFinder {
    return element(by.id('add-recipe'));
  }

  getRecipeForm(): ElementFinder {
    return element(by.id('recipe-form'));
  }

  getRecipeFormInput(): ElementFinder {
    return element(by.css('input[name="newRecipeName"]'));
  }

  getRecipeFormTextArea(): ElementFinder {
    return element(by.css('textarea[name="newRecipeInstructions"]'));
  }

  getRecipeFormInputSubmit(): ElementFinder {
    return element(by.css('input[type="submit"]'));
  }

    getRecipeList(): ElementFinder {
    return element(by.css('#recipe-list'));
  }
}
