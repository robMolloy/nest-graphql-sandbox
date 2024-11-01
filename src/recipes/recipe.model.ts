import { Field, ID, ObjectType } from '@nestjs/graphql';
import { z } from 'zod';

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description?: string;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];
}

export const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.date(),
  ingredients: z.array(z.string()),
});

export const createRecipeDtoSchema = recipeSchema.omit({
  creationDate: true,
});
