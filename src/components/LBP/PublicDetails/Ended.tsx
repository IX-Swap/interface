import React from 'react'
import styled from 'styled-components'
import { ColumnCenter } from 'components/Column'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/ended.svg'
import { TYPE } from 'theme'
import { Line } from 'components/Line'
import { PinnedContentButton } from 'components/Button'
import { useLBPPurchasedShares } from 'state/lbp/hooks'
import { useActiveWeb3React } from 'hooks/web3'

interface EndedSideBarProps {
  contractAddress: string | null
  shareLogo: any
  shareName: string
}

const EndedSideBar: React.FC<EndedSideBarProps> = ({ contractAddress, shareLogo, shareName }) => {
  const { account } = useActiveWeb3React()
  const getLBPPurchasedShares = useLBPPurchasedShares(contractAddress || '', account)
  console.log(shareName)
  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          Ended
        </TYPE.body5>
        <DesContainer>
          <TYPE.description3>
            Tokens purchased with and without vesting in a LBP, must be redeem by clicking the “Redeem” button below at
            the end of the LBP. If the LBP you participated in has vested tokens, you can view the token stream using
            the link below.
          </TYPE.description3>
        </DesContainer>
        <Line style={{ margin: '20px 8px' }} />
        <ShareWrapper>
          <TYPE.description2 color={'#8F8FB2'}>Purchased Project Tokens:</TYPE.description2>
          <ShareTokenWrapper>
            <img style={{ borderRadius: '100%' }} width="25px" height="25px" src={shareLogo?.public} />
            <TYPE.label style={{ inlineSize: 'max-content', alignSelf: 'center' }} fontSize={'14px'}>
              {shareName}
            </TYPE.label>
          </ShareTokenWrapper>
        </ShareWrapper>
        <ShareWrapper>
          <TYPE.description7 style={{margin: '0px', lineHeight: '1px'}} color={'#292933'}>{getLBPPurchasedShares ? getLBPPurchasedShares.shareBalance : '0.0'}</TYPE.description7>
        </ShareWrapper>
        <Line style={{ margin: '20px 8px' }} />
        <PinnedContentButton margin={'0px 15px'} disabled>
          Claim
        </PinnedContentButton>
      </MiddleSection>
    </SideBarContainer>
  )
}

export default EndedSideBar

const ShareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 15px;
`

const DesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 0px 30px;
`


const SideBarContainer = styled.div`
  border: 1px solid #e6e6ff;
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

const ShareTokenWrapper = styled.div`
  border: 1px solid #e6e6ff;
  padding: 10px 18px;
  display: flex;
  gap: 5px;
  border-radius: 6px;
`
