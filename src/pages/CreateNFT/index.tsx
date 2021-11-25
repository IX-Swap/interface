import { Trans } from '@lingui/macro'
import React from 'react'
import { TYPE } from 'theme'
import { CreateForm } from './CreateForm'
import { Container, StyledTab } from './styleds'

const Create = () => {
  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Create NFT</Trans>
        </TYPE.title4>
      </StyledTab>
      <CreateForm />
    </Container>
  )
}
export default Create
