import React, { useMemo } from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'
import { File, Eye, ArrowLeft, Mail } from 'react-feather'

import { OfferTerms } from 'components/LaunchpadOffer/OfferSidebar/OfferTerms'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Column, Separator } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { text2, text5, text53 } from 'components/LaunchpadMisc/typography'

import { useFormatOfferValue } from 'state/launchpad/hooks'
import { InformationFormValues } from '../Information/types'
import { ReviewSidebar } from './Sidebar'

interface Props {
  values: InformationFormValues
  onSubmit: (draft: boolean) => void
  onClose: () => void
  draftDisabled: boolean
}

const formatDateRange = (from: Date, to?: Date) =>
  moment(from).format('Do MMM, HH:mm') + (to ? ` - ${moment(to).format('Do MMM')}` : '')

const crop = (value?: string) => ((value?.length ?? 0) > 20 ? value?.substring(0, 20) + '...' : value)

export const OfferReview: React.FC<Props> = ({ values, onSubmit, onClose, draftDisabled }) => {
  const theme = useTheme()
  const formatedValue = useFormatOfferValue()
  const numberFormatter = React.useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])

  const allocatedPublicSale = React.useMemo(
    () => formatedValue(`${Number(values.hardCap) - Number(values.presaleAlocated)}`),
    []
  )
  const minTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(values.minInvestment) / Number(values.tokenPrice))}`) ?? 'N/A',
    [values.minInvestment, values.tokenPrice]
  )
  const maxTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(values.maxInvestment) / Number(values.tokenPrice))}`) ?? 'N/A',
    [values.maxInvestment, values.tokenPrice]
  )

  const stageEntries = React.useMemo(() => {
    const entries = [
      values.timeframe.whitelist && {
        label: <StageLabel>Register To Invest</StageLabel>,
        value: <Nowrap>{formatDateRange(values.timeframe.whitelist, values.timeframe.preSale)}</Nowrap>,
      },
      values.timeframe.preSale && {
        label: <StageLabel>Pre-sale</StageLabel>,
        value: <Nowrap>{formatDateRange(values.timeframe.preSale, values.timeframe.sale)}</Nowrap>,
      },
      values.timeframe.sale && {
        label: <StageLabel>Public Sale</StageLabel>,
        value: <Nowrap>{formatDateRange(values.timeframe.sale, values.timeframe.closed)}</Nowrap>,
      },
      values.timeframe.sale && {
        label: <StageLabel>Closed</StageLabel>,
        value: <Nowrap>{formatDateRange(values.timeframe.closed, values.timeframe.claim)}</Nowrap>,
      },
      values.timeframe.sale && {
        label: <StageLabel>Token Claim</StageLabel>,
        value: <Nowrap>{formatDateRange(values.timeframe.claim)}</Nowrap>,
      },
    ]
    return entries.filter((i) => Boolean(i))
  }, [values.timeframe])

  const additionalDocsEntries = useMemo(() => {
    return values.additionalDocuments
      .filter((x) => x.file)
      .map((doc) => {
        return {
          label: (
            <FileName>
              <File size="18" /> {crop(doc.asset?.name || doc.file.file.name)}
            </FileName>
          ),
          value: <Eye size="14" stroke={theme.launchpad.colors.text.body} />,
          file: doc.asset || doc.file.file,
          hasAsset: !!doc.asset,
        }
      })
  }, [theme, values.additionalDocuments])

  return (
    <ReviewModalContainer>
      <ReviewContainer>
        <Sidebar>
          <ReviewSidebar offer={values} onSubmit={onSubmit} onClose={onClose} draftDisabled={draftDisabled} />
        </Sidebar>

        <Title>
          <OutlineButton background={theme.launchpad.colors.background} onClick={onClose} padding="1rem 0.75rem">
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </OutlineButton>
          Review
        </Title>

        <Container area="stages">
          <InfoList title="Investment Stages" titleFontWeight="600" entries={stageEntries} />
        </Container>

        <Container area="company-information">
          <InfoList
            title="Company Information"
            titleFontWeight="600"
            entries={[
              { label: 'Issuer', value: values.issuerIdentificationNumber || 'N/A' },
              { label: 'Country', value: values.country || 'N/A' },
              { label: 'Investment Type', value: values.investmentType ?? 'N/A' },

              {
                label: 'Token Price',
                value: `${values.tokenType}  ${formatedValue(values.tokenPrice?.toString()) ?? 'N/A'} / 1 ${
                  values.tokenTicker
                }`,
              },

              {
                label: 'Max. Investment Size',
                value: `${values.tokenType} ${formatedValue(values.maxInvestment) ?? 'N/A'} / ${maxTokenInvestment} ${
                  values.tokenTicker
                }`,
              },

              {
                label: 'Min. Investment Size',
                value: `${values.tokenType}  ${formatedValue(values.minInvestment) ?? 'N/A'} / ${minTokenInvestment} ${
                  values.tokenTicker
                }`,
              },
            ]}
          />
        </Container>

        <Container area="total-funding-size">
          <Column>
            <SaleAllocationTitle>Total Fundraising Size</SaleAllocationTitle>

            <Separator />

            <SaleAllocationEntry>
              <div>
                <span className="bold">
                  {values.tokenType} {formatedValue(values.softCap) ?? 'N/A'}
                </span>{' '}
                Soft Cap /
                <span className="bold">
                  {values.tokenType} {formatedValue(values.hardCap) ?? 'N/A'}
                </span>{' '}
                Hard Cap
              </div>
            </SaleAllocationEntry>

            <Separator />

            <SaleAllocationEntry>
              <div>
                <span className="bold">
                  {values.tokenType} {formatedValue(values.presaleAlocated)}
                </span>{' '}
                Allocated for Pre-Sale
              </div>
            </SaleAllocationEntry>

            <Separator />

            <SaleAllocationEntry>
              <div>
                <span className="bold">
                  {values.tokenType} {allocatedPublicSale}
                </span>{' '}
                Allocated for Public Sale
              </div>
            </SaleAllocationEntry>
          </Column>
        </Container>

        {values.hasPresale && (
          <Container area="presale-size">
            <Column>
              <SaleAllocationTitle>Pre-Sale Investment Sizes</SaleAllocationTitle>

              <Separator />

              <SaleAllocationEntry>
                <EntryLabel>Max. Investment Size</EntryLabel>
                <EntryValue>
                  {values.tokenType} {formatedValue(numberFormatter.format(Number(values.presaleMaxInvestment)))}
                </EntryValue>
              </SaleAllocationEntry>

              <Separator />

              <SaleAllocationEntry>
                <EntryLabel>Min. Investment Size</EntryLabel>
                <EntryValue>
                  {values.tokenType} {formatedValue(numberFormatter.format(Number(values.presaleMinInvestment)))}
                </EntryValue>
              </SaleAllocationEntry>
            </Column>
          </Container>
        )}

        <Container area="terms">
          <OfferTerms terms={values.terms} />
        </Container>

        <Container area="additional-documents">
          <InfoList title="Additional Document" titleFontWeight="600" entries={additionalDocsEntries} />
        </Container>

        <Container area="contact">
          <InfoList
            title="Contact Us"
            titleFontWeight="600"
            entries={[
              {
                label: (
                  <ContactLine href={values.email ? `mailto:${values.email}` : '#'}>
                    <Mail size="18" /> {values.email}
                  </ContactLine>
                ),
              },
            ]}
          />
        </Container>
      </ReviewContainer>
    </ReviewModalContainer>
  )
}

const ReviewModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;

  background: ${(props) => props.theme.launchpad.colors.background};
  overflow: auto;
  * {
    font-family: 'Inter' !important;
  }
`

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  grid-template-rows: repeat(5, auto);
  grid-template-areas:
    'title title title'
    'stages company-information sidebar'
    'total-funding-size presale-size .'
    'terms additional-documents .'
    'terms contact .';

  gap: 1.25rem;
  max-width: 1180px;
  margin: 3rem auto;
`

const Title = styled.div`
  grid-area: title;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${text53}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Sidebar = styled.aside`
  grid-area: sidebar;
  padding: 1.5rem 2rem;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Container = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  padding: 1.5rem 2rem;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Nowrap = styled.div`
  white-space: nowrap;
`

const StageLabel = styled(Nowrap)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;

  color: ${(props) => props.theme.launchpad.colors.text.body};
`
const SaleAllocationTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const SaleAllocationEntry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.caption};

  .bold {
    color: ${(props) => props.theme.launchpad.colors.text.title};
  }
`

const EntryLabel = styled.div`
  ${text5}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const EntryValue = styled(EntryLabel)`
  font-weight: 600;
  text-align: right;
`

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`

const ContactLine = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.launchpad.colors.text.body};
  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  svg > * {
    stroke: ${(props) => props.theme.launchpad.colors.text.body};
  }
`
