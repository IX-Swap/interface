import { getRpcProviderService } from 'dependencies/rpc-provider.service';
import { JsonRpcProvider } from '@ethersproject/providers';

import { configService as _configService } from '../config/config.service';
import AllowancesConcern from './concerns/allowances.concern';
import BalancesConcern from './concerns/balances.concern';
import MetadataConcern from './concerns/metadata.concern';

export default class TokenService {
  provider: JsonRpcProvider;
  metadata: MetadataConcern;
  balances: BalancesConcern;
  allowances: AllowancesConcern;

  constructor(
    readonly metadataConcernClass = MetadataConcern,
    readonly balancesConcernClass = BalancesConcern,
    readonly allowancesConcernClass = AllowancesConcern,
    readonly rpcProviderService = getRpcProviderService(),
    readonly configService = _configService
  ) {
    // @ts-ignore
    this.provider = this.rpcProviderService.jsonProvider;
    this.metadata = new metadataConcernClass(this);
    this.balances = new balancesConcernClass(this);
    this.allowances = new allowancesConcernClass(this);
  }
}
