import { GraphQLQuery } from '@ixswap1/dex-v2-sdk';

export type QueryArgs = Record<string, any>;
export type QueryAttrs = Record<string, any>;
export type QueryBuilder = (
  args?: QueryArgs,
  attrs?: QueryAttrs,
  name?: string
) => Record<string, any>;
export type PoolsQueryBuilder = (
  args?: QueryArgs,
  attrs?: QueryAttrs,
  name?: string
) => GraphQLQuery;
