import { Args, Query, Resolver } from '@nestjs/graphql';
import { Recipe } from './recipe.model';
import { RecipesArgs } from './recipes.args';

const delay = async (x: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), x);
  });
};

@Resolver(() => Recipe)
export class RecipesResolver {
  @Query(() => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    await delay(250);
    const recipe = {
      id: 'id1',
      title: ':',
      description: ':',
      creationDate: new Date(),
      ingredients: ['apples', 'pears'],
    };
    return [...Array(50)]
      .map((_, j) => ({ ...recipe, id: `id_${j + 1}` }))
      .slice(recipesArgs.skip, recipesArgs.take);
  }
}
