import { AppFeature } from 'types/app'
import { Notification } from 'types/notification'

export const notification: Notification = {
  _id: '1',
  createdBy: '',
  createdAt: '2020-10-14T03:54:06.977Z',
  to: '',
  service: '',
  feature: AppFeature.Authentication,
  resourceId: '',
  subject: 'Cash Withdrawl',
  type: 'success',
  message: 'Your cash withdrawl request has been declined.',
  read: false,
  readAt: ''
}
