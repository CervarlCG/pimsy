import { Resolver, Query } from '@nestjs/graphql';
import { Product } from './models/recipe.model';

@Resolver((of) => Product)
export class ProductsResolver {
  @Query((returns) => Product)
  async product(): Promise<Product> {
    return null;
  }

  @Query((returns) => Product, {})
  async product2(): Promise<Product> {
    return null;
  }
}
