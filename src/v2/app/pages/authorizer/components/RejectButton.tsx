import React from 'react'
import { Button } from '@material-ui/core'
import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import classNames from 'classnames'
import { useAuthorizerAction } from 'v2/app/pages/authorizer/hooks/useAuthorizerAction'

export interface RejectButtonProps {
  itemId: string
  disabled: boolean
}

export const RejectButton = (props: RejectButtonProps) => {
  const feature = useAuthorizerCategory()
  const classes = useStyles()
  const uri = authorizerItemMap[feature].uri
  const [reject, { isLoading }] = useAuthorizerAction(props.itemId, 'reject')
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
