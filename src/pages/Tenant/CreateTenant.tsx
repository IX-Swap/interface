import React from 'react'
import { MEDIA_WIDTHS } from 'theme'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { useFormik } from 'formik'
import * as yup from 'yup'

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
import apiService from 'services/apiService'
import { whitelabel } from 'services/apiUrls'
import { getActiveRoutes } from './helpers'
import Token from './components/Token'
import { useSecTokenState } from 'state/secTokens/hooks'

const validationSchema = yup.object({
  name: yup.string().required('Tenant name is required'),
  title: yup.string().required('Title is required'),
  domain: yup.string().required('Domain is required'),
  appUrl: yup.string().required('App URL is required'),
  description: yup.string().required('Description is required'),
  defaultUrl: yup.string().required('Default URL is required'),
  chartsUrl: yup.string().required('Charts URL is required'),
  supportEmail: yup.string().required('Support Email is required'),
  termLink: yup.string().required('Term Link is required'),
  policyLink: yup.string().required('Policy Link is required'),
  block1: yup.string().required('Block 1 is required'),
  logoUrl: yup.string().required('A logo URL is required').url('Invalid URL format'),
  faviconUrl: yup.string().required('A favicon URL is required').url('Invalid URL format'),
  bannerImageUrl: yup.string().required('A banner URL is required').url('Invalid URL format'),
})

const pages = {
  dex: false,
  kyc: false,
  lbp: false,
  lbpAdmin: false,
  offer: false,
  issuance: false,
  payout: false,
  securityTokens: false,
  admin: false,
}

const initialValues = {
  name: '',
  title: '',
  domain: '',
  appUrl: '',
  description: '',
  isIxSwap: false,
  pages,
  enableLbp: false,
  enableFeaturedSecurityVaults: false,
  enableLaunchpadBanner: false,
  tokens: [],
}

const CreateTenant = () => {
  const { tokens, loadingRequest } = useSecTokenState()
  const activeTokens = tokens && tokens.length > 0 ? tokens : []

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: any) => {
      try {
        formik.setSubmitting(true)
        const payload = {
          name: values.name,
          title: values.title,
          appUrl: values.appUrl,
          description: values.description,
          bannerImageUrl: 'https://pbs.twimg.com/profile_banners/1222418712466198529/1706865528/1500x500',
          pages: getActiveRoutes(values.pages),
          chartsUrl: values.appUrl,
          enableLbp: values.enableLbp,
          defaultUrl: values.defaultUrl,
          faviconUrl: 'https://prime.investax.io/favicon.ico',
          logoUrl: 'https://api.dev.ixswap.io/v1/storage/file/public/e66f7e04-c944-467f-a208-eb858b92ff07',
          enableFeaturedSecurityVaults: values.enableFeaturedSecurityVaults,
          colors: '{"button":{"primary":"#0081ff"}}',
          customStyles: '{}',
          supportEmail: values.supportEmail,
          isIxSwap: values.isIxSwap,
          tokens: '[]',
          jwtSecretName: 'READI',
          domain: values.domain,
          enableLaunchpadBanner: true,
          launchpadBannerTitle: 'Invest in potential RWA projects for financial & non-financial benefits',
          launchpadBannerInfoRedirectTitle: 'What is READI?',
          launchpadBannerInfoRedirectUrl: 'https://www.readi-innovative.com/',
          complyCubeSuccessRedirectUrl: values.complyCubeSuccessRedirectUrl,
          complyCubeCancelRedirectUrl: values.complyCubeCancelRedirectUrl,
          footerConfig:
            '{"socialLinks":{"telegram":"https://t.me/investaxtelegram","linkedin":"https://www.linkedin.com/company/investax","youtube":"https://www.youtube.com/channel/UCAJI2c_gP8TUbaKOrjMX0IA","twitter":"https://twitter.com/investax"},"termsLink":"https://investax.io/terms-of-use/","policyLink":"https://investax.io/privacy/","block1":"Readi Innovative Company Limited (Company Registration No.: 0105566197981) (\u201CReadi\u201D)\\nAMM (Bahamas) Ltd (Company Registration No.: 207865B) (\u201CIX Swap\u201D) offers an enterprise-grade tokenization solution that enables businesses to issue, manage, and distribute tokenized real-world assets, digital assets and securities in a compliant manner. This site is made available through a hosted software as a solution service provided by IX Swap to Readi and is jointly powered by IX Swap and Readi.","block2":"IX Swap is approved as a Digital Asset Business and Digital Token Exchange under the Digital Assets And Registered Exchanges Act, 2020, by the Securities Commission Of The Bahamas (\u201CDARE Licence\u201D). The DARE Licence allows IX Swap to provide digital asset services such as facilitating exchanges and transfers of digital assets, and providing financial services related to the offer or sale of digital assets. Any and all digital asset and/or securities offerings offered on this site by Readi are facilitated through IX Swap and the DARE Licence.","block3":"By visiting this site, you agree to be bound by IX Swap\u2019s Terms And Conditions Of Use and Privacy Policy. This site is intended for access only in those jurisdictions and to those persons where and to whom it may be lawfully accessed. No part of this site should form the basis of, or be relied upon in connection with, any investment decision or any contract or commitment to purchase or subscribe for any digital assets and/or securities. Investment in any digital assets and/or securities entails significant risks, including illiquidity, lack of dividends, loss of investment, and dilution, and should be done only with an accurate understanding and complete acceptance of these risks. Investors should invest only if they have the financial ability and willingness to accept such risks. To the fullest extent permitted by law, Readi and IX Swap disclaim all responsibility and liability for any and all loss, damage, or other adverse consequences arising out of or in relation to any reliance placed on any information contained on this site. "}',
        }
        const response = await apiService.post(whitelabel.create, payload)
        if (response.status === 201) {
          console.log('Tenant created successfully')
        }
        debugger
      } catch (e) {
        console.error(e)
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

  console.log('formik', formik)
  return (
    <Container>
      <Content>
        <Title>Create Tenant</Title>
        <FormRow>
          <FormContainer>
            <FormCard id="GeneralInfo">
              <GeneralInfo formik={formik} />
            </FormCard>
            <FormCard id="Design">
              <Design formik={formik} />
            </FormCard>
            <FormCard id="PagesAndFeatures">
              <PagesAndFeatures formik={formik} />
            </FormCard>
            <FormCard id="SocialLinks">
              <SocialLinks formik={formik} />
            </FormCard>

            <FormCard id="Tokens">
              {!loadingRequest ? <Token formik={formik} activeTokens={activeTokens} /> : null}
            </FormCard>

            <FormCard id="SupportInformaton">
              <SupportInformation formik={formik} />
            </FormCard>
            <FormCard id="KYCLinks">
              <KYCLinks formik={formik} />
            </FormCard>
            <FormCard id="LaunchpadBanner">
              <LaunchpadBanner formik={formik} />
            </FormCard>
            <FormCard id="FooterConfig">
              <FooterConfig formik={formik} />
            </FormCard>

            <Flex justifyContent="flex-end" mt="20px">
              <div style={{ marginRight: 16 }}>
                <ButtonOutlined style={{ width: '200px', background: '#fff', fontSize: 14 }}>Cancel</ButtonOutlined>
              </div>
              <PinnedContentButton
                type="submit"
                style={{ width: '200px', height: 48, fontSize: 14 }}
                onClick={formik.submitForm}
              >
                Submit
              </PinnedContentButton>
            </Flex>
          </FormContainer>

          <StyledStickyBox style={{ marginBottom: isMobile ? '100px' : '1700px' }}>
            <ProgressBar
              isDisabled={formik.isSubmitting}
              submitForm={formik.submitForm}
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
