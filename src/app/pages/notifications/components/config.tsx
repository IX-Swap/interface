import { Check, Close, PriorityHigh } from '@mui/icons-material'
import { ElementType } from 'react'
import { themeColors } from 'themes/app/colors'
import { NotificationType } from 'types/notification'

export const notificationIconMap: Record<NotificationType, ElementType> = {
  success: Check,
  SELL: Check,
  BUY: Check,
  error: Close,
  info: PriorityHigh,
  warning: PriorityHigh
}

export const notificationColorMap: Record<NotificationType, string> = {
  success: themeColors.success,
  BUY: themeColors.success,
  SELL: themeColors.success,
  error: themeColors.error,
  info: themeColors.info,
  warning: themeColors.warning
}
