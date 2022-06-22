import { TypeOptions } from 'react-toastify'
import { AppFeature } from './app'

export type NotificationType = TypeOptions | 'BUY' | 'SELL'

export interface Notification {
  _id: string
  createdBy: string
  createdAt: string
  to: string
  service: string
  feature: AppFeature
  resourceId: string
  subject: string
  type: NotificationType
  message: string
  read: boolean
  readAt: string
  comment?: string
}
