import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it('displays a #recipe-form on the page when state for isRecipeFormDisplayed is true', () => {
    const compiled = fixture.debugElement.nativeElement;
    comp.isRecipeFormDisplayed = true;
    fixture.detectChanges();

    expect(compiled.querySelector('#recipe-form')).toBeTruthy();
  })

  it('invoking toggleAddRecipeForm() once causes isRecipeFormDisplayed state to be true', () => {
    comp.toggleAddRecipeForm();
    expect(comp.isRecipeFormDisplayed).toBeTrue();
  });

  it('invoking toggleAddRecipeForm() twice causes isRecipeFormDisplayed state to be false again', () => {
    comp.toggleAddRecipeForm();
    comp.toggleAddRecipeForm();
    expect(comp.isRecipeFormDisplayed).toBeFalse();
  });
  
  it('calls toggleAddRecipeForm() once when the #add-recipe button is clicked', () => {
    spyOn(comp, 'toggleAddRecipeForm');
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('#add-recipe').click();

    expect(comp.toggleAddRecipeForm).toHaveBeenCalledTimes(1);
  })

  it('displays a recipe list item when there is one in state', () => {
    comp.recipeList = [
      {
        name: "Tofu Scramble Tacos"
      },
    ];
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const recipeList = compiled.querySelector('#recipe-list');

    expect(recipeList.innerHTML).toContain('Tofu Scramble Tacos');
  })

  it('submitting the form calls addRecipeToRecipeList', () => {
    comp.isRecipeFormDisplayed = true;
    fixture.detectChanges();
    spyOn(comp, 'addRecipeToRecipeList');
    const compiled = fixture.debugElement.nativeElement;
    const submitRecipeInput = compiled.querySelector('#recipe-form > input[type="submit"]');
    submitRecipeInput.click();

    expect(comp.addRecipeToRecipeList).toHaveBeenCalledTimes(1);
  });

  it('calling addRecipeToRecipeList with form values newRecipeName "Fruit Smoothie" and newRecipeInstructions "Blend up the fruit" adds that recipe to component state', () => {
    const testRecipe = { newRecipeName: 'Fruit Smoothie', newRecipeInstructions: 'Blend up the fruit'};
    comp.newRecipeForm.controls['newRecipeName'].setValue(testRecipe.newRecipeName);
    comp.newRecipeForm.controls['newRecipeInstructions'].setValue(testRecipe.newRecipeInstructions);

    comp.addRecipeToRecipeList();
    fixture.detectChanges();
    expect(comp.recipeList[0].name).toEqual(testRecipe.newRecipeName);
    expect(comp.recipeList[0].instructions).toEqual(testRecipe.newRecipeInstructions);
    });

  it('typing values into the form fields updates the model values in the FormGroup', () => {
    comp.isRecipeFormDisplayed = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const recipeNameInput = compiled.querySelector('#recipe-form > input[name="newRecipeName"]');
    const testName = 'Bananas';
    const recipeInstructionsInput = compiled.querySelector('#recipe-form > textarea[name="newRecipeInstructions"]');
    const testInstructions = "Peel with pleasure";

    recipeNameInput.value = testName;
    recipeNameInput.dispatchEvent(new Event('input'));

    recipeInstructionsInput.value = testInstructions;
    recipeInstructionsInput.dispatchEvent(new Event('input'));

    expect(comp.newRecipeForm.controls['newRecipeName'].value).toEqual(testName);
    expect(comp.newRecipeForm.controls['newRecipeInstructions'].value).toEqual(testInstructions);
  })

});
