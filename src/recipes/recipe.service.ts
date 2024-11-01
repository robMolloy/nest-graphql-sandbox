import { Injectable } from '@nestjs/common';
import { Recipe } from './recipe.model';

type TRecipe = Recipe;
const allRecipes: Recipe[] = [
  {
    id: 'id1',
    title: ':',
    description: ':',
    creationDate: new Date(),
    ingredients: ['apples', 'pears'],
  },
  {
    id: 'id2',
    title: 'pineapple surprise',
    description: 'pineapple plus a surprise',
    creationDate: new Date(),
    ingredients: ['pineapple', 'surprise'],
  },
];

@Injectable()
export class RecipesService {
  private recipes = allRecipes;

  create(recipe: TRecipe) {
    allRecipes.push(recipe);
  }

  getAllRecipes() {
    return this.recipes;
  }

  getFilteredRecipes(initProps: Partial<TRecipe>) {
    const props = {} as Record<keyof TRecipe, unknown>;
    for (const k in initProps) {
      const key = k as keyof TRecipe;
      if (initProps[key] !== undefined) props[key] = initProps[key];
    }

    const keys = Object.keys(props) as (keyof typeof props)[];

    return keys.length === 0
      ? this.recipes
      : this.recipes.filter((recipe) => {
          return keys.every((k) => recipe[k] === props[k]);
        });
  }
}
