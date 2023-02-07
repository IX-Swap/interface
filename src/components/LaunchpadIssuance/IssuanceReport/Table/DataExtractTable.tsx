import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Centered } from 'components/LaunchpadMisc/styled'
import { Checkbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { RowCenter } from 'components/Row'
import { FormikProvider, useFormik } from 'formik'
import { useQueryParams, useSetQueryParams } from 'hooks/useParams'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from 'rebass'
import { useExtractReport, useGetIssuancesReport } from 'state/issuance/hooks'
import { IssuanceDataExtract } from 'state/issuance/types'
import useDraggableScroll from 'use-draggable-scroll'
import { DataCell } from './DataCell'
import { EmptyTable } from './EmptyTable'
import { Header } from './Header'
import { ExtractFieldsForm, useFieldsByRole } from './helpers'
import { Statistics } from './Statistics'
import {
  Container,
  JoinedCell,
  OverflowIssuanceTable,
  OverflowRaw,
  OverflowRow,
  SpreadColumn,
  TablesParent,
  UnpaddedOverflowIssuanceTable,
} from './styled'
import { IssuanceReportTab } from './types'

const pageQueryParams = ['tab', 'page']
const DEFAULT_PAGE_SIZE = '10'

export const DataExtractTable = () => {
  const { issuanceId } = useParams<{ issuanceId: string }>()
  const [offset, setOffset] = useState(DEFAULT_PAGE_SIZE)
  const {
    objectParams: { tab, page },
  } = useQueryParams<{ tab: IssuanceReportTab; page: number }>(pageQueryParams)
  const setQueryParams = useSetQueryParams<{ page: string; tab: string }>(pageQueryParams)

  const { data, loading } = useGetIssuancesReport({ issuanceId, tab, page, offset })
  const { extract } = useExtractReport()
  const {
    result: { items, totalItems, totalPages },
    statistics,
  } = data

  const ref = useRef(null)
  const { onMouseDown } = useDraggableScroll(ref)
  const sendExtractData = (values: ExtractFieldsForm) => {
    const fields = Object.entries(values)
      .filter(([, value]) => value)
      .map(([key]) => key) as (keyof IssuanceDataExtract)[]
    extract({ fields, issuanceId, tab })
  }
  const { header, fields, initialValues } = useFieldsByRole()
  const formik = useFormik({
    initialValues,
    onSubmit: sendExtractData,
  })
  const { values } = formik
  const columnCount = header.length
  return (
    <>
      <Container ref={ref} onMouseDown={onMouseDown}>
        {loading && (
          <Centered>
            <Loader />
          </Centered>
        )}
        {!loading && items?.length === 0 && <EmptyTable />}
        {items && items?.length > 0 && (
          <TablesParent>
            <UnpaddedOverflowIssuanceTable>
              <Header header={header} />
              <Statistics statistics={statistics} count={columnCount} />
              <FormikProvider value={formik}>
                <OverflowRow count={columnCount}>
                  <SpreadColumn key="extract">
                    <span>Extract</span>
                    <JoinedCell>
                      <Box marginLeft="-13px">
                        <Checkbox
                          checked={values[fields[0]]}
                          onChange={(value: boolean) => formik.setFieldValue(fields[0], value)}
                        />
                      </Box>
                    </JoinedCell>
                  </SpreadColumn>
                  {fields.slice(1).map((field) => (
                    <OverflowRaw key={field}>
                      <Checkbox
                        checked={values[field]}
                        onChange={(value: boolean) => formik.setFieldValue(field, value)}
                      />
                    </OverflowRaw>
                  ))}
                </OverflowRow>
              </FormikProvider>
            </UnpaddedOverflowIssuanceTable>
            <OverflowIssuanceTable>
              <OverflowRow count={columnCount}></OverflowRow>
              {items?.map((investment: IssuanceDataExtract) => (
                <OverflowRow count={columnCount} key={investment.offerId + investment.offerInvestmentId}>
                  {fields.map((field) => (
                    <DataCell key={field} field={field} investment={investment} />
                  ))}
                </OverflowRow>
              ))}
            </OverflowIssuanceTable>
          </TablesParent>
        )}
      </Container>

      <RowCenter>
        <IssuancePagination
          currentPage={page}
          pageSize={Number(offset)}
          totalPages={totalPages}
          totalItems={totalItems}
          smallMargin
          onChangePage={(page) => setQueryParams({ page: page.toString(), tab })}
          onChangePageSize={(size) => setOffset(size.toString())}
        />
      </RowCenter>
      <RowCenter style={{ gap: '1.25rem' }}>
        <OutlineButton
          onClick={() => {
            console.log('back')
          }}
          padding="0 1.5rem"
          width="280px"
        >
          Back
        </OutlineButton>

        <FilledButton padding="0 1.5rem" width="280px" onClick={formik.submitForm}>
          Extract
        </FilledButton>
      </RowCenter>
    </>
  )
}
