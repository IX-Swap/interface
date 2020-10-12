export interface Notification {
  _id: string
  createdBy: string
  createdAt: string
  to: string
  service: string
  feature: string
  resourceId: string
  subject: string
  type: 'success' | 'failure'
  message: string
  read: boolean
  readAt: string
}
