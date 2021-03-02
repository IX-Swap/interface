import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'

export const useDialogs = () => {
  const { data } = useNotifications()

  const identityNotifications = data.filter(
    item =>
      (item.feature === 'individuals' || item.feature === 'corporates') &&
      (item.subject === 'Identity Approved' ||
        item.subject === 'Corporate Identity Approved') &&
      !item.read
  )

  return {
    identityNotifications: identityNotifications
  }
}
