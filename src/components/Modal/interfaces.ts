export interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number | string
  maxWidth?: number |string
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  topContent?: React.ReactNode
  isright?: boolean
  mobileMaxHeight?: number | false
  scrollable?: boolean
  tip?: string
}
