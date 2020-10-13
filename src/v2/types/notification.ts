import { AppFeature } from './app'

export interface Notification {
  _id: string
  createdBy: string
  createdAt: string
  to: string
  service: string
  feature: AppFeature
  resourceId: string
  subject: string
  type: 'success' | 'failure'
  message: string
  read: boolean
  readAt: string
}
