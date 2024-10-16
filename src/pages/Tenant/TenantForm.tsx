/* eslint-disable indent */
import React, { useEffect } from 'react'
import { MEDIA_WIDTHS } from 'theme'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { useFormik } from 'formik'
import { useHistory, useLocation, useParams } from 'react-router-dom'

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
import { generateTenantSubmitPayload, setFieldsValue } from './helpers'
import Token from './components/Token'
import { useSecTokenState } from 'state/secTokens/hooks'
import { useShowError, useShowSuccess } from 'state/application/hooks'
import Loader from 'components/Loader'
import { routes } from 'utils/routes'
import { useGlobalState } from 'state/global/hooks'
import { validationSchema } from './schema'
import { TenantDetails } from './types'
import { pages } from './helpers'

const initialValues: TenantDetails = {
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

const TenantForm = () => {
  const showError = useShowError()
  const showSuccess = useShowSuccess()
  const { tokens, loadingRequest } = useSecTokenState()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { pathname } = useLocation()
  const { selectedTenant } = useGlobalState()

  const [tenant, setTenant] = React.useState<any>({})

  const activeTokens = tokens && tokens.length > 0 ? tokens : []

  const formik = useFormik<TenantDetails>({
    initialValues,
    validationSchema: !id ? validationSchema : null,
    onSubmit: async (values: any) => {
      try {
        const payload = generateTenantSubmitPayload(values)
        formik.setSubmitting(true)

        const payloadPatch = {} as any

        if (id) {
          for (const [key, value] of Object.entries(payload)) {
            if (['pages', 'tokens'].includes(key)) {
              if (tenant.isIxSwap) {
                payloadPatch[key] = null
              } else if (tenant[key] != value) {
                payloadPatch[key] = value
              }
            } else if (tenant[key] != value) {
              payloadPatch[key] = value
            }
          }

          const response = await apiService.patch(`${whitelabel.create}/${id}`, payloadPatch)

          if (response.status === 200) {
            showSuccess('Tenant edit successfully')
            history.push(routes.tenant)
          }
        } else {
          const response = await apiService.post(whitelabel.create, payload)

          if (response.status === 201) {
            showSuccess('Tenant created successfully')
            history.push(routes.tenant)
          }
        }
      } catch (e: any) {
        showError(e?.message ?? '')
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await apiService.get(`${whitelabel.config}/${id}`)
        const { data, status } = response
        if (status !== 200) {
          showError('Failed to fetch tenant details')
          return
        }

        setTenant(data)
        setFieldsValue(formik.setFieldValue, data)
      } catch (error) {
        console.error(error)
        showError('Failed to fetch tenant details')
      }
    }

    if (id) {
      fetchTenantDetails()
    }
  }, [id, showError])

  useEffect(() => {
    if (selectedTenant && pathname === routes.tenantClone) {
      setFieldsValue(formik.setFieldValue, selectedTenant)
    }
  }, [JSON.stringify(selectedTenant)])

  return (
    <Container>
      <Content>
        <Title>{!!id ? 'Edit Tenant' : 'Create Tenant'}</Title>
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
                <ButtonOutlined
                  style={{ width: '200px', background: '#fff', fontSize: 14 }}
                  onClick={() => history.push(routes.tenant)}
                >
                  Cancel
                </ButtonOutlined>
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

export default TenantForm

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
