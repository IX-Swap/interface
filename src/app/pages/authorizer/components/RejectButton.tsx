import React from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from 'app/pages/authorizer/components/styles'
import classNames from 'classnames'
import { MutateFunction } from 'react-query/types/core'

export interface RejectButtonProps {
  disabled: boolean
  reject: MutateFunction<any, any, any, any>
}

export const RejectButton = (props: RejectButtonProps) => {
  const classes = useStyles()
  const { disabled, reject } = props

  const handleClick = async () => await reject()

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
