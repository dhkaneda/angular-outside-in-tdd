import { Component } from '@angular/core';
import { Recipe } from './recipe';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRecipeFormDisplayed:boolean = false;
  recipeList:Array<Recipe> = [];
  newRecipeForm: FormGroup = new FormGroup({
    newRecipeName: new FormControl(''),
    newRecipeInstructions: new FormControl(''),
  });

  
  toggleAddRecipeForm() {
    this.isRecipeFormDisplayed = !this.isRecipeFormDisplayed;
  }

  addRecipeToRecipeList() {
    const newRecipeToAdd: Recipe = new Recipe(
      this.newRecipeForm.controls.newRecipeName.value,
      this.newRecipeForm.controls.newRecipeInstructions.value,
    );

    this.recipeList = [...this.recipeList, newRecipeToAdd];
  }
}
