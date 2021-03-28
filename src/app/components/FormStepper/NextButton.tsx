import React from 'react'
import { Submit } from 'components/form/Submit'

export const NextButton = () => {
  return (
    <Submit variant='contained' watchIsDirty={false}>
      Next
    </Submit>
  )
}
