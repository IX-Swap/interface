import { TypeBackground } from '@material-ui/core/styles/createPalette'
import { ReactNode, ComponentType } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface LightTypeBackground extends TypeBackground {
  light: string
}

export interface LabelValue {
  label: string
  value: string
}

export interface TableColumn<T> {
  key: string
  label: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  headAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  render?: (val: any, row: T) => ReactNode | JSX.Element | string
}

export type AuthorizableStatus =
  | 'Unauthorized'
  | 'Approved'
  | 'Rejected'
  | 'Submitted'
  | ''

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
  from?: string
  to?: string
}

export interface InternalRouteBase {
  label: string
  path: string
}
export interface InternalRouteProps extends InternalRouteBase {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
  exact?: boolean
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
