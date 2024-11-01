import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Recipe } from './recipe.model';
import { RecipesArgs } from './recipes.args';
import { RecipesService } from './recipe.service';
import { NewRecipeInput } from './new-recipe.input';
import { z } from 'zod';

const delay = async (x: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), x);
  });
};

const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.date(),
  ingredients: z.array(z.string()),
});
const createRecipeDtoSchema = recipeSchema.omit({ creationDate: true });

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
  async addRecipe(
    @Args('newRecipeData') initRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const parsed = createRecipeDtoSchema.safeParse(initRecipeData);
    if (!parsed.success) throw new Error();

    const newRecipeData = { ...parsed.data, creationDate: new Date() };
    await this.recipesService.create(newRecipeData);
    return newRecipeData;
  }
}
