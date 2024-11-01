import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewRecipeInput } from './new-recipe.input';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipe.service';
import { RecipesArgs } from './recipes.args';

const delay = async (x: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), x);
  });
};

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const service = new RecipesService();
    await delay(250);

    return service.getAllRecipes().slice(recipesArgs.skip, recipesArgs.take);
  }

  @Mutation(() => Recipe)
  async addRecipe(@Args('newRecipeData') initRecipeData: NewRecipeInput) {
    const resp = this.recipesService.createFromUnknownData(initRecipeData);
    if (resp.success) return resp.data;
    throw new Error();
  }
}
