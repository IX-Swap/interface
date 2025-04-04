import React from 'react'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import { ExternalLink, SemiTransparent } from '../../theme'
import { ButtonEmpty } from '../Button'
import useTheme from 'hooks/useTheme'

export const PoolInformation = () => {
  const theme = useTheme()
  return (
    <SemiTransparent>
      <ButtonEmpty padding="8px" data-testid="view-pool-information">
        <ExternalLink style={{ width: '100%', textAlign: 'center' }} href={`https://www.ixs.finance/`}>
          <Text fontWeight={600} fontSize={'12px'} lineHeight={'18px'} color={theme.text2}>
            <Trans>
              View pool information<span style={{ fontSize: '14px' }}>↗</span>
            </Trans>
          </Text>
        </ExternalLink>
      </ButtonEmpty>
    </SemiTransparent>
  )
}
