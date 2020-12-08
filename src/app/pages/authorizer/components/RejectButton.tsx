import React from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from 'app/pages/authorizer/components/styles'
import classNames from 'classnames'

export interface RejectButtonProps {
  disabled: boolean
  reject: Function
}

export const RejectButton = (props: RejectButtonProps) => {
  const classes = useStyles()
  const { disabled, reject } = props

  const handleClick = async () => reject()

  return (
    <Button
      size='large'
      color='secondary'
      variant='contained'
      onClick={handleClick}
      disabled={disabled}
      className={classNames({
        [classes.rejectedButton]: !disabled
      })}
    >
      Reject
    </Button>
  )
}
