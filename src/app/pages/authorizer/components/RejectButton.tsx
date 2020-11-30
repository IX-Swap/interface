import React from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from 'app/pages/authorizer/components/styles'
import classNames from 'classnames'
import { useAuthorizerAction } from 'app/pages/authorizer/hooks/useAuthorizerAction'

export interface RejectButtonProps {
  itemId: string
  disabled: boolean
}

export const RejectButton = (props: RejectButtonProps) => {
  const classes = useStyles()
  const [reject, { isLoading }] = useAuthorizerAction({
    id: props.itemId,
    action: 'reject'
  })
  const handleClick = async () => await reject()
  const disabled = isLoading || props.disabled

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
