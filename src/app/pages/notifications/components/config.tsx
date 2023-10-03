import { Check, Close, PriorityHigh } from '@mui/icons-material'
import { ElementType } from 'react'
import { themeColors } from 'themes/app/colors'
import { NotificationType } from 'types/notification'

export const notificationIconMap: Record<NotificationType, ElementType> = {
  success: Check,
  default: Check,
  SELL: Check,
  BUY: Check,
  error: Close,
  info: PriorityHigh,
  warning: PriorityHigh
}

export const notificationColorMap: Record<NotificationType, string> = {
  //   success: themeColors.success,
  success: '#7DD320',
  default: themeColors.success,
  BUY: themeColors.success,
  SELL: themeColors.success,
  //   error: themeColors.error,
  error: '#F56283',
  info: themeColors.info,
  warning: themeColors.warning
}

export const notificationBackgroundMap: Record<NotificationType, string> = {
  //   success: themeColors.success,
  success: '#7DD32033',
  default: '#fff',
  BUY: '#fff',
  SELL: '#fff',
  error: '#F5628333',
  info: '#fff',
  warning: '#fff'
}
