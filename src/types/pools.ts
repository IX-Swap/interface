import { PoolActivityType } from "services/pool/types";

export type PoolFilterOptions = {
  poolIds?: string[];
  tokens?: string[];
  poolTypes?: PoolActivityType[];
  poolAttributes?: PoolAttributeFilter[];
  useExactTokens?: boolean;
  pageSize?: number;
  first?: number;
  sortField?: string;
};

export enum Protocol {
  Aave = 'aave',
  Agave = 'agave',
  Beefy = 'beefy',
  Euler = 'euler',
  Yearn = 'yearn',
  Gearbox = 'gearbox',
  Idle = 'idle',
  Morpho = 'morpho',
  Tessera = 'tessera',
  Sturdy = 'sturdy',
  Reaper = 'reaper',
  Tetu = 'tetu',
  Granary = 'granary',
  Zerovix = '0vix',
  Gyro = 'gyro',
  Eigenlayer = 'eigenlayer',
  Renzo = 'renzo',
  Swell = 'swell',
  EtherFi = 'etherfi',
  Kelp = 'kelp',
  Mellow = 'mellow',
  Symbiotic = 'symbiotic',
  Superfest = 'superfest',
}

export enum PoolTypeFilter {
  Weighted = 'Weighted',
  Stable = 'Stable',
  CLP = 'CLP',
  LBP = 'LBP',
  LRT = 'LRT',
  Points = 'Points',
}

export enum PoolAttributeFilter {
  New = 'New',
}

export type FactoryType =
  | 'oracleWeightedPool'
  | 'weightedPool'
  | 'stablePool'
  | 'managedPool'
  | 'liquidityBootstrappingPool'
  | 'boostedPool'
  | 'composableStablePool'
  | 'fx'
  | 'eulerLinear'
  | 'gyroE'
  | 'erc4626Linear'
  | 'metaStable'

export enum PoolFeature {
  Boosted = 'boosted',
  CLP = 'clp',
  Points = 'points',
}

export type PoolFeatures = {
  [key in PoolFeature]?: {
    featureProtocols?: Protocol[]
  }
}

export type PoolMetadata = {
  name?: string
  hasIcon?: boolean
  features?: PoolFeatures
  points?: {
    protocol: Protocol
    multiple: string
    description?: string
    url?: string
    expiryTimestamp?: number // in secs - https://timestamp.online/
  }[]
}

export enum RiskKey {
  General = 'general-risks',
  Economic = 'economic-risk',
  ToxicToken = 'toxic-token-risk',
  RebaseToken = 'rebasing-tokens',
  Governance = 'governance-risk',
  FlashLoan = 'flash-loans-risk',
  JoinExit = 'join-exit-risk',
  ImpermanentLoss = 'impermanent-loss-risk',
  UI = 'ui-risk',
  Regulatory = 'regulatory-risk',
  PoolType = 'pool-type-risk',
  Oracle = 'oracles',
  Network = 'network-risks',
  Weighted = 'weighted-pools',
  Stable = 'stable-pools',
  ComposableStable = 'composable-pools',
  MetaStable = 'meta-stable-pools',
  Boosted = 'boosted-pools',
  Arbitrum = 'arbitrum',
  Polygon = 'polygon',
  Optimism = 'optimism',
  Gnosis = 'gnosis',
  Mutable = 'mutable-attributes-risk',
  Composability = 'composability-risk',
  RateProvider = 'rate-provider-risk',
  RateProviderBridge = 'rate-provider-bridges',
}

export type NamedPools = {
  staBAL: string
  bbAaveUSD: {
    v1: string
    v2: string
    v3: string
  }
  xMatic: {
    v1: string
    v2: string
  }
  stMatic: {
    v1: string
    v2: string
  }
  mai4: {
    mai4: string
    maiBbaUsd: string
  }
  veBAL: string
  veLIT: string
  veUSH: string
  veQi: string
  veGEM: string
  veTHX: string
}

export type DeprecatedDetails = {
  newPool?: string
  suggestedPools?: string[]
  description?: string
  title?: string
}

export type NewVersionAvailableDetails = DeprecatedDetails

export enum PoolMigrationType {
  AAVE_BOOSTED_POOL = 'aaveBoostedPool',
  STABAL3_POOL = 'stabal3Pool',
  MAI_POOL = 'maiPool',
  STMATIC_POOL = 'stmaticPool',
  XMATIC_POOL = 'xmaticPool',
}

export type PoolMigrationInfo = {
  type: PoolMigrationType
  fromPoolId: string
  toPoolId: string
  riskI18nLabels?: string[]
  showOldVHint?: boolean
}

export type Pools = {
  IdsMap: Partial<NamedPools>
  Pagination: {
    PerPage: number
    PerPool: number
    PerPoolInitial: number
  }
  BoostsEnabled: boolean
  DelegateOwner: string
  ZeroAddress: string
  DynamicFees: {
    Gauntlet: string[]
  }
  BlockList: string[]
  IncludedPoolTypes: string[]
  Stable: {
    AllowList: string[]
  }
  Investment: {
    AllowList: string[]
  }
  Weighted: {
    AllowList: string[]
  }
  Factories: Record<string, FactoryType>
  Stakable: {
    // Pools to be included in the voting gauges list.
    VotingGaugePools: string[]
    // Pools that have additional rewards and therefore should be stakable but are not included in the VotingGaugePools list.
    AllowList: string[]
  }
  Metadata: Record<string, PoolMetadata>
  Deep: string[]
  BoostedApr: string[]
  DisabledJoins: string[]
  ExitViaInternalBalance?: string[]
  BrandedRedirect?: Partial<Record<string, string>>
  Deprecated?: Record<string, DeprecatedDetails>
  NewVersionAvailable?: Record<string, NewVersionAvailableDetails>
  GaugeMigration?: Record<string, DeprecatedDetails>
  Migrations?: Record<string, PoolMigrationInfo>
  Issues?: Partial<Record<PoolWarning, string[]>>
  Risks?: Record<string, RiskKey[]>
}

export enum PoolWarning {
  PoolProtocolFeeVulnWarning = 'poolProtocolFeeVulnWarning',
  PoolOwnerVulnWarningGovernanceMigrate = 'poolOwnerVulnWarningGovernanceMigrate',
  PoolOwnerVulnWarningGovernanceWithdraw = 'poolOwnerVulnWarningGovernanceWithdraw',
  PoolOwnerVulnWarningGovernance = 'poolOwnerVulnWarningGovernance',
  PoolOwnerVulnWarningEcosystem = 'poolOwnerVulnWarningEcosystem',
  PoolOwnerVulnWarningEcosystemMigrate = 'poolOwnerVulnWarningEcosystemMigrate',
  RenBTCWarning = 'renBTCWarning',
  EulerBoostedWarning = 'eulerBoostedWarning',
  EulerRecoveryModeWarning = 'eulerRecoveryModeWarning',
  CspPoolVulnWarning = 'cspPoolVulnWarning',
  FxPoolVulnWarning = 'fxPoolVulnWarning',
  RateProviderWarning = 'rateProviderWarning',
}
