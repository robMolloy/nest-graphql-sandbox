import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class NewRecipeInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];
}
