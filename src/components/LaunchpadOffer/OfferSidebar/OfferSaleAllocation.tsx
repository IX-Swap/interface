import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { Info } from 'react-feather'

interface Props {
  offer: Offer
}

export const OfferSaleAllocation: React.FC<Props> = (props) => {
  return (
    <SaleAllocationContainer>
      <SaleAllocationTitle>Token Sale Allocation</SaleAllocationTitle>
      
      <Separator />

      <SaleAllocationEntry>
        <div>
          <span className='bold'>${props.offer.softCap}</span> Soft Cap /
          <span className='bold'>${props.offer.hardCap}</span> Hard Cap
        </div>
      </SaleAllocationEntry>
      
      <Separator />
      
      <SaleAllocationEntry>
        <div>
          <span className='bold'>${props.offer.presaleAlocated}</span> Allocated for Pre-Sale
        </div>
      </SaleAllocationEntry>
      
      <Separator />
      
      <SaleAllocationEntry>
        <div>
          <span className='bold'>${Number(props.offer.hardCap) - Number(props.offer.presaleAlocated)}</span> Allocated for Public Sale
        </div>
      </SaleAllocationEntry>
    </SaleAllocationContainer>
  )
}

export const OfferPreSaleInfo: React.FC<Props> = (props) => {
  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])

  return (
    <SaleAllocationContainer>
      <SaleAllocationTitle>
        Pre-Sale
        <Tooltip title="Pre-Sale" body="The pre-sale round has its own maximum and minimum investment sizes that may differ from the public sale. You need to register to invest in order to participate in the pre-sale round.">
          <Info size="14" />
        </Tooltip>
      </SaleAllocationTitle>
      
      <Separator />

      <SaleAllocationEntry>
        <EntryLabel>Max. Investment Size</EntryLabel>
        <EntryValue>${formatter.format(Number(props.offer.presaleMaxInvestment))}</EntryValue>
      </SaleAllocationEntry>
      
      <Separator />
      
      <SaleAllocationEntry>
        <EntryLabel>Min. Investment Size</EntryLabel>
        <EntryValue>${formatter.format(Number(props.offer.presaleMinInvestment))}</EntryValue>
      </SaleAllocationEntry>
    </SaleAllocationContainer>
  )
}

const SaleAllocationContainer = styled.div`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  padding: 1rem 1.5rem;
`

const SaleAllocationTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`

const SaleAllocationEntry = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};

  .bold {
    color: ${props => props.theme.launchpad.colors.text.title};
  }
`

const EntryLabel = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const EntryValue = styled(EntryLabel)`
  font-weight: 600;
  text-align: right;
`

const Separator = styled.hr`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  opacity: 0.8;

  margin: 0;
`

