import React from 'react'
import { MEDIA_WIDTHS } from 'theme'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

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
import { useShowError, useShowSuccess } from 'state/application/hooks'
import Loader from 'components/Loader'
import { routes } from 'utils/routes'

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
  colorButtonPrimary: '#6666FF',
}

const CreateTenant = () => {
  const showError = useShowError()
  const showSuccess = useShowSuccess()
  const { tokens, loadingRequest } = useSecTokenState()
  const history = useHistory()

  const activeTokens = tokens && tokens.length > 0 ? tokens : []

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: any) => {
      try {
        const payload = {
          name: values.name,
          title: values.title,
          appUrl: values.appUrl,
          description: values.description,
          bannerImageUrl: values.bannerImageUrl,
          pages: getActiveRoutes(values.pages),
          chartsUrl: values.appUrl,
          enableLbp: values.enableLbp,
          defaultUrl: values.defaultUrl,
          faviconUrl: values.faviconUrl,
          logoUrl: values.logoUrl,
          enableFeaturedSecurityVaults: values.enableFeaturedSecurityVaults,
          colors: JSON.stringify({
            button: { primary: values.colorButtonPrimary },
          }),
          customStyles: '{}',
          supportEmail: values.supportEmail,
          isIxSwap: values.isIxSwap,
          tokens: JSON.stringify(values.tokens),
          domain: values.domain,
          enableLaunchpadBanner: true,
          launchpadBannerTitle: values.launchpadBannerTitle,
          launchpadBannerInfoRedirectTitle: values.launchpadBannerInfoRedirectTitle,
          launchpadBannerInfoRedirectUrl: values.launchpadBannerInfoRedirectUrl,
          kycSuccessRedirectUrl: values.kycSuccessRedirectUrl,
          kycCancelRedirectUrl: values.kycCancelRedirectUrl,
          footerConfig: JSON.stringify({
            socialLinks: {
              telegram: values.telegram,
              linkedin: values.linkedin,
              youtube: values.youtube,
              twitter: values.twitter,
            },
            termsLink: values.termLink,
            policyLink: values.policyLink,
            block1: values.block1,
            block2: values.block2,
            block3: values.block3,
          }),
        }
        formik.setSubmitting(true)
        const response = await apiService.post(whitelabel.create, payload)

        if (response.status === 201) {
          showSuccess('Tenant created successfully')
          history.push(routes.tenant)
        }
      } catch (e: any) {
        showError(e?.message ?? '')
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

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
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Loader size="18px" /> : null} Submit
              </PinnedContentButton>
            </Flex>
          </FormContainer>

          <StyledStickyBox style={{ marginBottom: isMobile ? '100px' : '1700px' }}>
            <ProgressBar
              isSubmitting={formik.isSubmitting}
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
