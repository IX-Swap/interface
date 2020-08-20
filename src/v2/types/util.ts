import { TypeBackground } from '@material-ui/core/styles/createPalette'
import { ReactNode } from 'react'
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
  render?: (val: any, row: T) => React.ReactNode | JSX.Element | string
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

export type RowAction<T> = (row: T) => ReactNode

export interface BaseFilter {
  status: AuthorizableStatus
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
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
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
