import React, { ReactElement, useState } from 'react'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'
import { useAuth } from 'hooks/auth/useAuth'

export interface ChildrenProps {
  enable2Fa: boolean | undefined
  showDialog: () => void
}

export interface TwoFADialogWrapperProps {
  children: ReactElement
  extraCheck?: boolean
}

export const TwoFADialogWrapper = ({
  children,
  extraCheck = true
}: TwoFADialogWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user

  const handleClick = (e: any) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      {React.cloneElement(
        children,
        extraCheck && enable2Fa !== true
          ? { onClick: (e: any) => handleClick(e) }
          : {}
      )}
      <TwoFADialog
        isOpen={isOpen}
        enable2Fa={enable2Fa}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
