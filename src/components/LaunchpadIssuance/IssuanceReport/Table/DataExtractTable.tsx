import { TableHeader, TableRow } from 'components/LaunchpadIssuance/utils/tables'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Centered } from 'components/LaunchpadMisc/styled'
import { IssuanceTable, Raw } from 'components/LaunchpadMisc/tables'
import { Checkbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import PlainCopy from 'components/PlainCopy/PlainCopy'
import { RowCenter } from 'components/Row'
import { FormikProvider, useFormik } from 'formik'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOffersData } from 'state/issuance/hooks'
import styled, { css } from 'styled-components'
import useDraggableScroll from 'use-draggable-scroll'
import { shortenAddress } from 'utils'
import { shortenEmail } from 'utils/strings'
import { calculateAge } from 'utils/time'
import { extractFields, initialValues } from '../constants'
import { EmptyTable } from './EmptyTable'
import { ValueOrTick } from './ValueOrTick'

export const DataExtractTable = () => {
  const { offerId } = useParams<{ offerId: string }>()
  const { data, loading } = useGetOffersData(offerId)
  const statistics = data?.statistics
  const investments = data?.investments
  const ref = useRef(null)
  const { onMouseDown } = useDraggableScroll(ref)
  const sendExtractData = (values: any) => {
    console.log(values)
  }
  const formik = useFormik({
    initialValues,
    onSubmit: sendExtractData,
  })
  const { values } = formik

  return (
    <>
      <Container ref={ref} onMouseDown={onMouseDown}>
        {loading && (
          <Centered>
            <Loader />
          </Centered>
        )}
        {investments && investments?.length > 0 && (
          <OverflowIssuanceTable>
            {!loading && data?.investments?.length === 0 && <EmptyTable />}
            <OverflowHeader>
              <SpreadColumn key="name">
                <span style={{ color: 'transparent' }}>Total</span>
                <JoinedCell>Name</JoinedCell>
              </SpreadColumn>
              <OverflowRaw>Company Name</OverflowRaw>
              <OverflowRaw>Investment amount</OverflowRaw>
              <OverflowRaw>Amount of tokens</OverflowRaw>
              <OverflowRaw>Wallet address</OverflowRaw>
              <OverflowRaw>Transaction ID</OverflowRaw>
              <OverflowRaw>Nationality</OverflowRaw>
              <OverflowRaw>Country</OverflowRaw>
              <OverflowRaw>Accredited investor</OverflowRaw>
              <OverflowRaw>Email</OverflowRaw>
              <OverflowRaw>Occupation</OverflowRaw>
              <OverflowRaw>Income</OverflowRaw>
              <OverflowRaw>Age</OverflowRaw>
              <OverflowRaw>Investment round</OverflowRaw>
              <OverflowRaw>Wish investment amount</OverflowRaw>
            </OverflowHeader>
            {statistics && (
              <OverflowRow key="statistics">
                <SpreadColumn>
                  <span>Total</span>
                  <JoinedCell>{statistics.nameCount}</JoinedCell>
                </SpreadColumn>
                <OverflowRaw>{statistics.companyNameCount}</OverflowRaw>
                <OverflowRaw>{statistics.totalInvestmentAmount}</OverflowRaw>
                <OverflowRaw>{statistics.totalTokenAmount}</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>{statistics.nationalityCount}</OverflowRaw>
                <OverflowRaw>{statistics.countryCount}</OverflowRaw>
                <OverflowRaw>{statistics.accreditedCount}</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
                <OverflowRaw>-</OverflowRaw>
              </OverflowRow>
            )}
            <FormikProvider value={formik}>
              <OverflowRow>
                <SpreadColumn key="extract">
                  <span>Extract</span>
                  <JoinedCell>
                    <Checkbox
                      checked={values[extractFields[0]]}
                      onChange={(value: boolean) => formik.setFieldValue(extractFields[0], value)}
                    />
                  </JoinedCell>
                </SpreadColumn>
                {extractFields.slice(1).map((field) => (
                  <OverflowRaw key={field}>
                    <Checkbox
                      checked={values[field]}
                      onChange={(value: boolean) => formik.setFieldValue(field, value)}
                    />
                  </OverflowRaw>
                ))}
              </OverflowRow>
            </FormikProvider>
            {investments?.map((investment) => (
              <OverflowRow key={investment.offerId + investment.offerInvestmentId}>
                <OverflowRaw>
                  <ValueOrTick>{investment.name}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.companyName}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.invesmentAmount}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.tokenAmount}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <PlainCopy toCopy={investment.walletAddress}>
                    <ValueOrTick>{shortenAddress(investment.walletAddress)}</ValueOrTick>
                  </PlainCopy>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.transactionId}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.nationality}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.country}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>{investment.accredited == '1' ? 'Yes' : 'No'}</OverflowRaw>
                <OverflowRaw>
                  <PlainCopy toCopy={investment.email}>
                    <ValueOrTick>{shortenEmail(investment.email)}</ValueOrTick>
                  </PlainCopy>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.occupation}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.income}</ValueOrTick>
                </OverflowRaw>
                <OverflowRaw>{investment.dateOfBirth ? calculateAge(investment.dateOfBirth) : '-'}</OverflowRaw>
                <OverflowRaw>{investment.stage === 'sale' ? 'Sale' : 'Pre-Sale'}</OverflowRaw>
                <OverflowRaw>
                  <ValueOrTick>{investment.wishAmount}</ValueOrTick>
                </OverflowRaw>
              </OverflowRow>
            ))}
          </OverflowIssuanceTable>
        )}
      </Container>
      <RowCenter style={{ gap: '1.25rem' }}>
        <OutlineButton
          onClick={() => {
            console.log('back')
          }}
          padding="0 1.5rem"
        >
          Back
        </OutlineButton>

        <FilledButton padding="0 1.5rem" onClick={formik.submitForm}>
          Extract
        </FilledButton>
      </RowCenter>
    </>
  )
}

const Container = styled.div`
  max-width: 1180px;
  margin: auto;
  width: 100%;
  overflow-x: scroll;
`
const OverflowIssuanceTable = styled(IssuanceTable)`
  overflow-x: scroll;
  max-width: unset;
  width: fit-content;
  margin: unset;
`
const columnTemplate = css`
  grid-template-columns: repeat(15, minmax(155px, 1fr));
  grid-auto-flow: column;
  grid-gap: 80px;
  grid-auto-columns: minmax(160px, 1fr);
`
const OverflowHeader = styled(TableHeader)`
  ${columnTemplate}
`
const OverflowRow = styled(TableRow)`
  ${columnTemplate}
`
const OverflowRaw = styled(Raw)`
  overflow: visible;
`
const SpreadColumn = styled(OverflowRaw)`
  display: flex;
  gap: 70px;
  justify-content: space-between;
`

const JoinedCell = styled.span`
  width: 100%;
  display: grid;
  grid-template-rows: 100%;
  grid-auto-rows: 100%;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr;
`
