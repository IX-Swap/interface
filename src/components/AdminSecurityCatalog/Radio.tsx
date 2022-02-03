import React, { FC } from 'react'
import { Box } from 'rebass'

import Toggle from 'components/Toggle'

interface Props {
  isActive: boolean
  onToggle: () => void
}

export const Radio: FC<Props> = ({ isActive, onToggle }: Props) => {
  return (
    <Box marginBottom="20px">
      <Toggle isActive={isActive} toggle={onToggle} />
    </Box>
  )
}
