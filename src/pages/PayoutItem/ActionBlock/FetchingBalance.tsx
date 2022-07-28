import React from 'react'
import { Trans } from '@lingui/macro'

import { Container } from './styleds'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Flex } from 'rebass'

export const FetchingBalance = () => {
  return (
    <Container>
      <Flex marginBottom="8px">
        <Trans>Checking your balance</Trans>
      </Flex>
      <LoaderThin size={28} />
    </Container>
  )
}
