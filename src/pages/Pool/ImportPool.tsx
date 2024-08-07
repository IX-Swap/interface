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
  // @media (max-width: 768px) {
  //   padding: 15px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  @media (max-width: 768px) {
    padding: 15px;
  `};
`

export const ImportPool = () => {
  const theme = useTheme()
  return (
    // <SemiTransparent>
    <>
      {' '}
      {/* <StyledButtonEmpty data-testid="find-pool-button" id="find-pool-button" as={Link} to="/add"> */}
      <StyledButtonEmpty data-testid="find-pool-button" id="find-pool-button" as={Link} to={routes.find}>
        <Text color={'#666680'} fontWeight={300} fontSize={'12px'} lineHeight={'18px'}>
          <Trans>Don&apos;t see a pool you joined?</Trans>&nbsp;
        </Text>
        <Text color={theme.launchpad.colors.primary} fontWeight={600} fontSize={'12px'} lineHeight={'18px'}>
          <Trans>Import it.</Trans>
        </Text>
      </StyledButtonEmpty>
    </>

    // </SemiTransparent>
  )
}
