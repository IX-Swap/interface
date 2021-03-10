import React, { Fragment } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair } from 'react-query'

export interface MoveButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  getRequestPayload: (data: any) => any
}

export const MoveButton = (props: MoveButtonProps) => {
  const {
    mutation,
    children,
    onClick,
    getRequestPayload,
    variant = 'outlined'
  } = props
  const [save, { isLoading }] = mutation
  const {
    watch,
    trigger,
    formState: { touched }
  } = useFormContext()
  const values = watch()

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isValid = await trigger()

    if (!isValid) {
      return
    }

    const isDirty = Object.values(touched).length > 0

    if (isDirty) {
      const payload = getRequestPayload(values)

      if (isValid) {
        await save(payload)
        onClick?.(event)
      }
    } else {
      onClick?.(event)
    }
  }

  return (
    <Fragment>
      <Button
        {...props}
        variant={variant}
        color='primary'
        onClick={handleSave}
        disabled={isLoading}
        disableElevation
      >
        {children}
      </Button>
    </Fragment>
  )
}
