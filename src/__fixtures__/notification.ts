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

export const notificationForAlert: Notification = {
  _id: '61e9c3a7107f007b8f0567c9',
  read: true,
  to: '602118fd102da53b8b5a8fc3',
  service: 'authentication',
  feature: AppFeature.Listings,
  resourceId: '602118fd102da53b8b5a8fc3',
  subject: 'Sign In',
  createdBy: '',
  type: 'success',
  message:
    'You signed in from 109.71.177.56 using Chrome 96.0.4664.110 on macOS 10.15.7',
  createdAt: '2022-01-20T20:18:47.474Z',
  readAt: '2022-02-21T12:11:09.661Z'
}
