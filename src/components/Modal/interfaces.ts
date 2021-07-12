export interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number | string
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  isRight?: boolean
  mobileMaxHeight?: number | false
}
