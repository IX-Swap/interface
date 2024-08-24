import React from 'react'
import { MEDIA_WIDTHS } from 'theme'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import { isMobile } from 'react-device-detect'

import { ProgressBar } from './components/ProgressBar'
import GeneralInfo from './components/GeneralInfo'
import SupportInformation from './components/SupportInformation'
import KYCLinks from './components/KYCLinks'
import FooterConfig from './components/FooterConfig'
import SocialLinks from './components/SocialLinks'
import PagesAndFeatures from './components/PagesAndFeatures'
import LaunchpadBanner from './components/LaunchpadBanner'
import Design from './components/Design'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { Flex } from 'rebass'

const CreateTenant = () => {
  return (
    <Container>
      <Content>
        <Title>Create Tenant</Title>
        <FormRow>
          <FormContainer>
            <FormCard id="GeneralInfo">
              <GeneralInfo />
            </FormCard>
            <FormCard id="Design">
              <Design />
            </FormCard>
            <FormCard id="PagesAndFeatures">
              <PagesAndFeatures />
            </FormCard>
            <FormCard id="SocialLinks">
              <SocialLinks />
            </FormCard>
            <FormCard id="Tokens">
              <h1 className="title">Tokens</h1>
            </FormCard>
            <FormCard id="SupportInformaton">
              <SupportInformation />
            </FormCard>
            <FormCard id="KYCLinks">
              <KYCLinks />
            </FormCard>
            <FormCard id="LaunchpadBanner">
              <LaunchpadBanner />
            </FormCard>
            <FormCard id="FooterConfig">
              <FooterConfig />
            </FormCard>

            <Flex justifyContent="flex-end" mt="20px">
              <div style={{ marginRight: 16 }}>
                <ButtonOutlined style={{ width: '200px', background: '#fff', fontSize: 14 }}>Cancel</ButtonOutlined>
              </div>
              <PinnedContentButton type="submit" style={{ width: '200px', height: 48, fontSize: 14 }}>
                Submit
              </PinnedContentButton>
            </Flex>
          </FormContainer>

          <StyledStickyBox style={{ marginBottom: isMobile ? '100px' : '1700px' }}>
            <ProgressBar
              topics={[
                {
                  title: 'General Info',
                  href: 'GeneralInfo',
                },
                {
                  title: 'Design',
                  href: 'Design',
                },
                {
                  title: 'Pages and Features',
                  href: 'PagesAndFeatures',
                },
                {
                  title: 'Social Links',
                  href: 'SocialLinks',
                },
                {
                  title: 'Tokens',
                  href: 'Tokens',
                },
                {
                  title: 'Support Informaton',
                  href: 'SupportInformaton',
                },
                {
                  title: 'KYC Links',
                  href: 'KYCLinks',
                },
                {
                  title: 'Launchpad Banner',
                  href: 'LaunchpadBanner',
                },
                {
                  title: 'Footer Config',
                  href: 'FooterConfig',
                },
              ]}
              description={null}
            />
          </StyledStickyBox>
        </FormRow>
      </Content>
    </Container>
  )
}

export default CreateTenant

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  font-family: ${(props) => props.theme.launchpad.font};
  background: #f7f7ff;
  margin-top: 32px;

  * {
    font-family: ${(props) => props.theme.launchpad.font};
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: auto;
    padding: 0px;
  }
`

const Content = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`

export const FormCard = styled.div<{ filled?: boolean }>`
  background: #ffffff;
  padding: 32px;
  border-radius: 8px;

  .title {
    color: #292933;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    letter-spacing: -0.6px;
    margin: 0;
  }
`

export const FormContainer = styled.div`
  gap: 20px;
  flex-grow: 1;

  & > * + * {
    margin-top: 20px;
  }
`

export const StyledStickyBox = styled(StickyBox).attrs(() => ({ offsetTop: 100 }))`
  width: 332px;
  border-radius: 8px;
`

const Title = styled.h1`
  color: #292933;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: -0.96px;
`
