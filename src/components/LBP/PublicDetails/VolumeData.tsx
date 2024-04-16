import React from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { LbpFormValues } from '../types'

interface MiddleSectionProps {
  lbpData: LbpFormValues | null
}

const VolumeData: React.FC<MiddleSectionProps> = ({ lbpData }) => {
  return (
    <Column>
      <AutoColumn style={{ marginBottom: '20px', }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Volume</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$248,050.00</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Liquidity</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$12,454.00</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Funds Raised</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$58,445.00</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>

      <AutoColumn style={{ marginBottom: '30px' }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Circ. Marketcap</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$15,889.00</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>FDV Marketcap</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$512,887.00 </TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Tokens Released</TYPE.subHeader1>
            <TokenWrapper style={{    placeContent: 'space-between'}}>
              <TYPE.label fontSize={'14px'}>26M/33M</TYPE.label>
              <TYPE.label color={'#6666FF'} fontSize={'14px'}>89%</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>
    </Column>
  )
}

const WeightBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;

  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 250px;
`

const QuantitiesBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 270px;
`

const TokenWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: #e5e5ff;
  margin: 7px 10px;
`
export default VolumeData