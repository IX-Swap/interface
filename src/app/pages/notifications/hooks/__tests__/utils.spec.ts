import {
  filterNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead
} from 'app/pages/notifications/hooks/utils'
import { AppFeature } from 'types/app'
import { Notification } from 'types/notification'
import { notification } from '__fixtures__/notification'

describe('getUnreadNotificationsCount', () => {
  it('returns 0 if notifications is empty', () => {
    expect(getUnreadNotificationsCount(null)).toBe(0)
    expect(getUnreadNotificationsCount(undefined)).toBe(0)
    expect(getUnreadNotificationsCount([])).toBe(0)
  })

  it('returns count of unread notifications', () => {
    const n1: Notification = { ...notification, read: true }
    const n2: Notification = { ...notification, read: false }
    const n3: Notification = { ...notification, read: false }

    expect(getUnreadNotificationsCount([n1, n2, n3])).toBe(2)
  })
})

describe('markAllNotificationsAsRead', () => {
  it('returns notifications with all marked as read', () => {
    const n1: Notification = { ...notification, read: true }
    const n2: Notification = { ...notification, read: false }
    const n3: Notification = { ...notification, read: false }

    const readNotifications = markAllNotificationsAsRead([n1, n2, n3])
    expect(getUnreadNotificationsCount(readNotifications)).toBe(0)
  })

  it('returns empty array if notifications are empty', () => {
    const readNotifications = markAllNotificationsAsRead([])
    expect(readNotifications).toEqual([])
  })

  it('returns empty array if notifications does not exist', () => {
    const newNotifications = markAllNotificationsAsRead()
    expect(newNotifications).toEqual([])
  })
})

describe('filterNotifications', () => {
  it('returns filtered notifications based on filters passed', () => {
    const n1: Notification = {
      ...notification,
      feature: AppFeature.CashDeposits
    }
    const n2: Notification = { ...notification, feature: AppFeature.Offerings }
    const n3: Notification = {
      ...notification,
      feature: AppFeature.Corporates
    }

    const filteredNotifications = filterNotifications(
      [AppFeature.CashDeposits, AppFeature.Offerings],
      [n1, n2, n3]
    )
    expect(filteredNotifications).toEqual([n1, n2])
  })

  it('returns all notifications if filter is undefined', () => {
    const n1: Notification = {
      ...notification,
      feature: AppFeature.CashDeposits
    }
    const n2: Notification = { ...notification, feature: AppFeature.Offerings }
    const n3: Notification = {
      ...notification,
      feature: AppFeature.Corporates
    }

    const filteredNotifications = filterNotifications(undefined, [n1, n2, n3])
    expect(filteredNotifications).toEqual([n1, n2, n3])
  })

  it('returns empty array if filter is empty', () => {
    const n1: Notification = {
      ...notification,
      feature: AppFeature.CashDeposits
    }
    const n2: Notification = { ...notification, feature: AppFeature.Offerings }
    const n3: Notification = {
      ...notification,
      feature: AppFeature.Corporates
    }

    const filteredNotifications = filterNotifications([], [n1, n2, n3])
    expect(filteredNotifications).toEqual([])
  })

  it('returns empty array if notifications does not exist', () => {
    const filteredNotifications = filterNotifications([AppFeature.CashDeposits])
    expect(filteredNotifications).toEqual([])
  })
})

describe('markNotificationAsRead', () => {
  it('returns notification with read is true', () => {
    const n1: Notification = { ...notification, _id: '1', read: false }
    const n2: Notification = { ...notification, _id: '2', read: false }
    const n3: Notification = { ...notification, _id: '3', read: false }

    const newNotifications = markNotificationAsRead('1', [n1, n2, n3])
    expect(newNotifications).toEqual([{ ...n1, read: true }, n2, n3])
  })

  it('returns untouched notifications if id does not exist', () => {
    const n1: Notification = { ...notification, _id: '1', read: false }
    const n2: Notification = { ...notification, _id: '2', read: false }
    const n3: Notification = { ...notification, _id: '3', read: false }

    const newNotifications = markNotificationAsRead('4', [n1, n2, n3])
    expect(newNotifications).toEqual([n1, n2, n3])
  })

  it('returns empty array if notifications does not exist', () => {
    const newNotifications = markNotificationAsRead('1')
    expect(newNotifications).toEqual([])
  })
})
