import { Check, Close, PriorityHigh } from '@material-ui/icons'
import { ElementType } from 'react'
import { themeColors } from 'themes/old/colors'
import { NotificationType } from 'types/notification'

export const notificationIconMap: Record<NotificationType, ElementType> = {
  success: Check,
  error: Close,
  info: PriorityHigh,
  warning: PriorityHigh
}

export const notificationColorMap: Record<NotificationType, string> = {
  success: themeColors.success,
  error: themeColors.error,
  info: themeColors.info,
  warning: themeColors.warning
}
