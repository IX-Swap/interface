import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SemiTransparent } from '../../theme'
import { Text } from 'rebass'
import { ButtonEmpty } from '../../components/Button'
import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'
import { routes } from 'utils/routes'

const StyledButtonEmpty = styled(ButtonEmpty)`
  padding: 0;
`

export const ImportPool = () => {
  const theme = useTheme()
  return (
    <SemiTransparent>
      <StyledButtonEmpty data-testid="find-pool-button" id="find-pool-button" as={Link} to={routes.find}>
        <Text color={theme.text2} fontWeight={300} fontSize={'12px'} lineHeight={'18px'}>
          <Trans>Don&apos;t see a pool you joined?</Trans>&nbsp;
        </Text>
        <Text color={theme.text2} fontWeight={600} fontSize={'12px'} lineHeight={'18px'}>
          <Trans>Import it.</Trans>
        </Text>
      </StyledButtonEmpty>
    </SemiTransparent>
  )
}
