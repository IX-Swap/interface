import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { GridItem, GridContainer } from 'components/Grid'
import { useGetManagedOfferInvestments } from 'state/launchpad/hooks'
import { OfferInvestmentsList } from './InvestmentsList'
import { alpha } from '@material-ui/core/styles'
import { InvestmentStagesFilter, ManagedOffer, MOInvestmentOrderConfig, OfferStatus } from 'state/launchpad/types'
import { useShowError } from 'state/application/hooks'

interface Props {
  offer: ManagedOffer
  chosenStage?: OfferStatus
}

export const InvestmentsBlock = ({ offer, chosenStage }: Props) => {
  const { load, error, isLoading, data } = useGetManagedOfferInvestments(offer.id)
  const showError = useShowError()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)
  const [order, setOrder] = useState<MOInvestmentOrderConfig>({})
  const stage = useMemo(() => {
    let res: InvestmentStagesFilter
    if (chosenStage === OfferStatus.preSale) {
      res = InvestmentStagesFilter.preSale
    } else if (chosenStage === OfferStatus.sale) {
      res = InvestmentStagesFilter.sale
    } else {
      res = InvestmentStagesFilter.all
    }
    return res
  }, [chosenStage])

  useEffect(() => {
    load(stage, page, order, pageSize)
  }, [stage, page, order, pageSize])
  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error])

  if (!data) {
    return <></>
  }
  return (
    <GridContainer>
      <StyledGridItem xs={12}>
        <OfferInvestmentsList
          data={data}
          order={order}
          setOrder={setOrder}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          offer={offer}
        />
      </StyledGridItem>
    </GridContainer>
  )
}

const StyledGridItem = styled(GridItem)`
  box-sizing: border-box;
  background: ${({ theme }) => alpha(theme.launchpad.colors.background, 0.3)};
  border: 1px solid ${({ theme }) => alpha(theme.launchpad.colors.border.default, 0.8)};
  border-radius: 8px;
  margin-bottom: 20px;
`
