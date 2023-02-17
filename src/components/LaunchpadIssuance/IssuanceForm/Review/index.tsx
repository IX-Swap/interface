import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { File, Eye, ArrowLeft, Mail } from 'react-feather'

import { useFormatOfferValue } from 'state/launchpad/hooks'
import { Asset, OfferFileType } from 'state/launchpad/types'

import { OfferTerms } from 'components/LaunchpadOffer/OfferSidebar/OfferTerms'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'

import { InformationFormValues } from '../Information/types'
import { ReviewSidebar } from './Sidebar'

import { Column, Row, Separator } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { text2, text5, text53 } from 'components/LaunchpadMisc/typography'

interface Props {
  values: InformationFormValues
  onSubmit: (draft: boolean) => void
  onClose: () => void
}

const formatDateRange = (from: Date, to?: Date) =>
  moment(from).format('Do MMM, HH:mm') + (to ? ` - ${moment(to).format('Do MMM')}` : '')

const crop = (value?: string) => ((value?.length ?? 0) > 20 ? value?.substring(0, 20) + '...' : value)

export const OfferReview: React.FC<Props> = (props) => {
  const theme = useTheme()
  const formatedValue = useFormatOfferValue()
  const numberFormatter = React.useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])

  const allocatedPublicSale = React.useMemo(
    () => formatedValue(`${Number(props.values.hardCap) - Number(props.values.presaleAlocated)}`),
    []
  )
  const minTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(props.values.minInvestment) / Number(props.values.tokenPrice))}`) ?? 'N/A',
    [props.values.minInvestment, props.values.tokenPrice]
  )
  const maxTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(props.values.maxInvestment) / Number(props.values.tokenPrice))}`) ?? 'N/A',
    [props.values.maxInvestment, props.values.tokenPrice]
  )

  return (
    <ReviewModalContainer>
      <ReviewContainer>
        <Sidebar>
          <ReviewSidebar offer={props.values} onSubmit={props.onClose} onClose={props.onClose} />
        </Sidebar>

        <Title>
          <OutlineButton background={theme.launchpad.colors.background} onClick={props.onClose} padding="1rem 0.75rem">
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </OutlineButton>
          Review
        </Title>

        <Container area="stages">
          <InfoList
            title="Investment Stage"
            titleFontWeight="600"
            entries={[
              props.values.timeframe.whitelist && {
                label: <StageLabel>Register to Invest</StageLabel>,
                value: (
                  <Nowrap>{formatDateRange(props.values.timeframe.whitelist, props.values.timeframe.preSale)}</Nowrap>
                ),
              },
              props.values.timeframe.preSale && {
                label: <StageLabel>Pre-sale</StageLabel>,
                value: <Nowrap>{formatDateRange(props.values.timeframe.preSale, props.values.timeframe.sale)}</Nowrap>,
              },
              props.values.timeframe.sale && {
                label: <StageLabel>Public Sale</StageLabel>,
                value: <Nowrap>{formatDateRange(props.values.timeframe.sale, props.values.timeframe.closed)}</Nowrap>,
              },
              props.values.timeframe.sale && {
                label: <StageLabel>Closed</StageLabel>,
                value: <Nowrap>{formatDateRange(props.values.timeframe.closed, props.values.timeframe.claim)}</Nowrap>,
              },
              props.values.timeframe.sale && {
                label: <StageLabel>Token Claim</StageLabel>,
                value: <Nowrap>{formatDateRange(props.values.timeframe.claim)}</Nowrap>,
              },
            ]}
          />
        </Container>

        <Container area="company-information">
          <InfoList
            title="Company Information"
            titleFontWeight="600"
            entries={[
              { label: 'Issuer', value: props.values.issuerIdentificationNumber || 'N/A' },
              { label: 'Country', value: props.values.country || 'N/A' },
              { label: 'Investment Type', value: props.values.investmentType ?? 'N/A' },

              {
                label: 'Token Price',
                value: `${props.values.tokenType}  ${formatedValue(props.values.tokenPrice?.toString()) ?? 'N/A'} / 1 ${
                  props.values.tokenTicker
                }`,
              },

              {
                label: 'Max. Investment Size',
                value: `${props.values.tokenType} ${
                  formatedValue(props.values.maxInvestment) ?? 'N/A'
                } / ${maxTokenInvestment} ${props.values.tokenTicker}`,
              },

              {
                label: 'Min. Investment Size',
                value: `${props.values.tokenType}  ${
                  formatedValue(props.values.minInvestment) ?? 'N/A'
                } / ${minTokenInvestment} ${props.values.tokenTicker}`,
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
                  {props.values.tokenType} {formatedValue(props.values.softCap) ?? 'N/A'}
                </span>{' '}
                Soft Cap /
                <span className="bold">
                  {props.values.tokenType} {formatedValue(props.values.hardCap) ?? 'N/A'}
                </span>{' '}
                Hard Cap
              </div>
            </SaleAllocationEntry>

            <Separator />

            <SaleAllocationEntry>
              <div>
                <span className="bold">
                  {props.values.tokenType} {formatedValue(props.values.presaleAlocated)}
                </span>{' '}
                Allocated for Pre-Sale
              </div>
            </SaleAllocationEntry>

            <Separator />

            <SaleAllocationEntry>
              <div>
                <span className="bold">
                  {props.values.tokenType} {allocatedPublicSale}
                </span>{' '}
                Allocated for Public Sale
              </div>
            </SaleAllocationEntry>
          </Column>
        </Container>

        <Container area="presale-size">
          <Column>
            <SaleAllocationTitle>Pre-Sale Investment Sizes</SaleAllocationTitle>

            <Separator />

            <SaleAllocationEntry>
              <EntryLabel>Max. Investment Size</EntryLabel>
              <EntryValue>
                {props.values.tokenType}{' '}
                {formatedValue(numberFormatter.format(Number(props.values.presaleMaxInvestment)))}
              </EntryValue>
            </SaleAllocationEntry>

            <Separator />

            <SaleAllocationEntry>
              <EntryLabel>Min. Investment Size</EntryLabel>
              <EntryValue>
                {props.values.tokenType}{' '}
                {formatedValue(numberFormatter.format(Number(props.values.presaleMinInvestment)))}
              </EntryValue>
            </SaleAllocationEntry>
          </Column>
        </Container>

        <Container area="terms">
          <OfferTerms terms={props.values.terms} />
        </Container>

        <Container area="additional-documents">
          <InfoList
            title="Additional Document"
            titleFontWeight="600"
            entries={props.values.additionalDocuments
              .filter((x) => x.file)
              .map((x) => ({
                file: { id: x.file?.id, name: x.name } as Asset,
                type: OfferFileType.document,
                videoUrl: '',
              }))
              .map((file) => ({
                label: (
                  <FileName>
                    <File size="18" /> {crop(file.file.name)}
                  </FileName>
                ),
                value: <Eye size="14" stroke={theme.launchpad.colors.text.body} />,
                file: file.file,
              }))}
          />
        </Container>

        <Container area="contact">
          <InfoList
            title="Contact Us"
            titleFontWeight="600"
            entries={[
              {
                label: (
                  <ContactLine href={props.values.email ? `mailto:${props.values.email}` : '#'}>
                    <Mail size="18" /> {props.values.email}
                  </ContactLine>
                ),
              },
            ]}
          />
        </Container>

        <BottomControls gap="1rem" margin="1rem 0" justifyContent="flex-end">
          {props.values.status !== IssuanceStatus.approved && (
            <OutlineButton onClick={() => props.onSubmit(true)}>Save Draft</OutlineButton>
          )}
          <OutlineButton onClick={props.onClose}>Back to Form</OutlineButton>
          {props.values.status !== IssuanceStatus.approved && (
            <FilledButton onClick={() => props.onSubmit(false)}>Submit</FilledButton>
          )}
        </BottomControls>
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
`

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  grid-template-rows: repeat(6, auto);
  grid-template-areas:
    'title title title'
    'stages company-information sidebar'
    'total-funding-size presale-size .'
    'terms additional-documents .'
    'terms contact .'
    'buttons buttons .';

  gap: 1.25rem;
  max-width: 1180px;
  margin: 3rem auto;
`

const BottomControls = styled(Row)`
  grid-area: buttons;
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
  font-size: 16px;
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
