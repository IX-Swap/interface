import { Theme } from '@mui/material/styles'
import { SelectProps } from '@mui/material'
import { TypeBackground } from '@mui/material/styles/createPalette'
import { ReactNode, ComponentType, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AppRole } from 'helpers/acl'

export interface LightTypeBackground extends TypeBackground {
  light: string
}

export interface LabelValue {
  label: string
  value: string
}

export interface TableColumn<T, K = string> {
  key: K
  label: string | JSX.Element
  secret?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  headAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  render?: (val: any, row: T) => ReactNode | JSX.Element | string
}

export type AuthorizableStatus =
  | 'Approved'
  | 'Rejected'
  | 'Submitted'
  | 'Closed'
  | 'Pending'
  | 'Draft'
  | 'Complete'
  | ''

export type FundStatus =
  | 'Not funded'
  | 'Funds on hold'
  | 'Settlement in Progress'
  | 'Funds transferred'
  | 'Rejected'
  | 'Failed'
  | ''

export type TradingStatus = 'Pending' | 'Matched' | 'Filled' | ''

export type DeploymentStatus = 'DEPLOYED' | 'PENDING' | ''
export interface NumberFormat {
  currency: string
}

export interface Viewable<T> {
  renderView?: (item: T) => JSX.Element
}

export interface BaseFilter {
  status?: AuthorizableStatus
  asset?: string
  type?: string
  search?: string
  sortBy?: string
  orderBy?: string | number
  sortIndex?: string | number
  searchInvestorName?: string
  listingKeyword?: string
  from?: string
  to?: string
  capitalStructure?: string
  isAssigned?: boolean
  sourceType?: string
  currency?: string
  network?: string
  isPriceAscending?: boolean
  fundStatus?: string
  reportType?: string
  isFavorite?: string
  sortField?: string
  sortOrder?: string
}

export interface InternalRouteBase {
  label: string
  path: string
}
export interface InternalRouteProps extends InternalRouteBase {
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>
  icon?: any
  exact?: boolean
  color?: string
  root?: boolean
  generic?: boolean
  external?: boolean
  authorizations?: AppRole[]
  backgroundColor?: keyof Theme['palette']['backgrounds']
}

export interface RouteMeta {
  title: string
  uri: string
  name: string
}

export interface InternalRoute<T> {
  route: InternalRouteBase
  meta: RouteMeta
  columns: TableColumn<T>
}

export type Maybe<T> = T | null

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[K] extends Record<string, unknown>
    ? DeepPartial<T[K]>
    : T[K]
}

export type TypedSelectProps<TValue = string> = Omit<
  SelectProps,
  'onChange'
> & {
  onChange?: (event: ChangeEvent<{ name?: string; value: TValue }>) => void
}
