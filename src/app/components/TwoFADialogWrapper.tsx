import React, { ReactElement, useState } from 'react'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'
import { useAuth } from 'hooks/auth/useAuth'

export interface ChildrenProps {
  enable2Fa: boolean | undefined
  showDialog: () => void
}

export interface TwoFADialogWrapperProps {
  children:
    | ReactElement
    | ReactElement[]
    | (({ enable2Fa, showDialog }: ChildrenProps) => ReactElement)
}

export const TwoFADialogWrapper = ({ children }: TwoFADialogWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user

  return (
    <>
      {typeof children === 'function'
        ? children({
            enable2Fa: enable2Fa,
            showDialog: () => setIsOpen(true)
          })
        : children}
      <TwoFADialog
        isOpen={isOpen}
        enable2Fa={enable2Fa}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
