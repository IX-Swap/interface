import React from 'react'

import { Container, Content, Divider, HeaderContainer } from './styleds'
import { LogoBlock } from './LogoBlock'
import { ProductsBlock } from './ProductsBlock'
import { SocialBlock } from './SocialBlock'
import { InfoBlock } from './InfoBlock'
import { CopyrightBlock } from './CopyrightBlock'

const WhiteLabelFooter = () => {
  return (
    <Container>
      <Content>
        <HeaderContainer>
          <LogoBlock />
          <ProductsBlock />
          <SocialBlock />
        </HeaderContainer>
        <Divider />
        <InfoBlock />
        <Divider />
        <CopyrightBlock />
      </Content>
    </Container>
  )
}

export default WhiteLabelFooter
