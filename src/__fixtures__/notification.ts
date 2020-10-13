import { AppFeature } from 'v2/types/app'
import { Notification } from 'v2/types/notification'

export const notification: Notification = {
  _id: '1',
  createdBy: '',
  createdAt: '',
  to: '',
  service: '',
  feature: AppFeature.Authentication,
  resourceId: '',
  subject: '',
  type: 'success',
  message: '',
  read: false,
  readAt: ''
}
