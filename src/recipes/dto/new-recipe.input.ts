import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class NewRecipeInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];
}
