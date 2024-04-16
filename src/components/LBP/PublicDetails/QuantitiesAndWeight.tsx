import React from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'

export default function QuantitiesAndWeight() {
  return (
    <Column>
      <AutoColumn style={{ marginBottom: '20px' }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <Serenity />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  Serenity{' '}
                </TYPE.body3>
              </>
              <VerticalLine />
              <>
                <USDC />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  USDC{' '}
                </TYPE.body3>
              </>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <Serenity />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  Serenity{' '}
                </TYPE.body3>
              </>
              <VerticalLine />
              <>
                <USDC />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  USDC{' '}
                </TYPE.body3>
              </>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>

      <AutoColumn justify="center" gap="md">
        <RowBetween style={{gap: '25px'}}>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <Serenity />
                <TYPE.label fontSize={'14px'}>50% </TYPE.label>
              </>
              <VerticalLine />
              <>
                <USDC />
                <TYPE.label fontSize={'14px'}>50% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <Serenity />
                <TYPE.label fontSize={'14px'}>40% </TYPE.label>
              </>
              <VerticalLine />
              <>
                <USDC />
                <TYPE.label fontSize={'14px'}>50% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <Serenity />
                <TYPE.label fontSize={'14px'}>56% </TYPE.label>
              </>
              <VerticalLine />
              <>
                <USDC />
                <TYPE.label fontSize={'14px'}>90% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
        </RowBetween>
      </AutoColumn>
    </Column>
  )
}

const WeightBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 250px;
`

const QuantitiesBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 410px;
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


