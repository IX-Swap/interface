import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/NoToken.svg'
import { TYPE } from 'theme'

export default function NoTokenSidebar() {
  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          No tokens are <br />
          available for purchase
        </TYPE.body5>
        <DesContainer>
          <TYPE.description3>
            No tokens are available for purchase at the moment. Please stay tuned for potential future availability.
          </TYPE.description3>
        </DesContainer>
        <AddWalletText>Add Asset to Wallet</AddWalletText>
      </MiddleSection>
    </SideBarContainer>
  )
}

const AddWalletText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #6666ff;
  margin-top: 16px;
`

const DesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 0px 50px;
`

const SideBarContainer = styled.div`
//   border: 1px solid #e6e6ff;
  border-radius: 8px;
  height: auto;
  padding: 20px;
  width: 400px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const MiddleSection = styled.div`
  margin: 20px 0;
  background: #ffffff;
  text-align: center;
`
