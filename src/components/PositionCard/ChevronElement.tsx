import React from 'react'
import { ChevronRight, ChevronLeft } from 'react-feather'
import { ButtonEmpty } from '../Button'
import { RowFixed } from '../Row'

import useTheme from 'hooks/useTheme'

interface Props {
  showMore: boolean
  setShowMore: (arg0: boolean) => void
}

export const ChevronElement = ({ showMore, setShowMore }: Props) => {
  const theme = useTheme()
  return (
    <RowFixed gap="8px">
      <ButtonEmpty padding="6px 8px" borderRadius="12px" width="100%" onClick={() => setShowMore(!showMore)}>
        {showMore && (
          <ChevronLeft size="20" color={theme.text2} style={{ marginLeft: '8px', height: '20px', minWidth: '20px' }} />
        )}
        {!showMore && (
          <ChevronRight size="20" color={theme.text2} style={{ marginLeft: '8px', height: '20px', minWidth: '20px' }} />
        )}
      </ButtonEmpty>
    </RowFixed>
  )
}
