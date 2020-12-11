import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Home Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display app header and recipe list placeholder text', () => {
    expect(page.getAppHeader()).toEqual('My Recipes');
    expect(page.getRecipePlaceholderText()).toEqual('There are no recipes to list.');
  });

  it("contains an add recipe button that when clicked opens a form", () => {
    const addRecipeButton = page.getAddRecipeButton();
    
    expect(page.getRecipeForm().isPresent()).toBeFalsy();
    
    addRecipeButton.click();
    expect(page.getRecipeForm().isPresent()).toBeTruthy();
  })

  it('contains a form with fields \'Recipe Name\' and \'Recipe Instructions\' after clicking the \'Add Recipe\' button',() => {
    const addRecipeButton = page.getAddRecipeButton();
    addRecipeButton.click();
    
    expect(page.getRecipeFormInput().isPresent()).toBeTruthy();
    expect(page.getRecipeFormTextArea().isPresent()).toBeTruthy();
  });

  it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
    // const addRecipeButton = cy.get('#add-recipe')
    const addRecipeButton = page.getAddRecipeButton();
    addRecipeButton.click().then(() => {
      page.getRecipeFormInput().sendKeys("Tofu Scramble Tacos");
      page.getRecipeFormTextArea().sendKeys("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas");
      page.getRecipeFormInputSubmit().click().then(() => {
        expect(page.getRecipeList().getText()).toContain("Tofu Scramble Tacos");
      })
    })
    // addRecipeButton.click().then(() => {  
    //   cy.get('input[name="newRecipeName"]').type("Tofu Scramble Tacos")
    //   cy.get('textarea[name="newRecipeInstructions"]').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
    //   cy.get('input[type="submit"]').click()
    //   cy.get('ul').then(() => { 
    //     cy.get('ul').contains("Tofu Scramble Tacos")
    //   }) 
    // }) 
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});