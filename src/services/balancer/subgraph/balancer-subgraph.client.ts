import { jsonToGraphQLQuery } from 'json-to-graphql-query';

import { subgraphFallbackService } from './subgraph-fallback.service';

export interface SubgraphQueryOptions {
  url?: string;
}

export default class BalancerSubgraphClient {
  public async get(query: any) {
    try {
      const payload = this.toPayload(query);
      const response = await subgraphFallbackService.get(payload);

      if (!response) {
        return;
      }

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public toPayload(query: any) {
    return { query: jsonToGraphQLQuery({ query }) };
  }
}

export const balancerSubgraphClient = new BalancerSubgraphClient();
