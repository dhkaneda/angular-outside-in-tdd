export class Recipe {
  name:String;
  instructions?:String;

  constructor(name?: String, instructions?: String) {
    this.name = name;
    this.instructions = instructions;
  }
}
