import React from 'react'
import { Button } from '@material-ui/core'
import { useReject } from '../hooks/useReject'
import { useAuthorizerTableStore } from '../context'

export interface RejectButtonProps {
  itemId: string
}

export const RejectButton = (props: RejectButtonProps) => {
  const { uri } = useAuthorizerTableStore()
  const [reject] = useReject({ id: props.itemId, uri })
  const handleClick = async () => await reject()

  return (
    <Button color='primary' variant='contained' onClick={handleClick}>
      Reject
    </Button>
  )
}
