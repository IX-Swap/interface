import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/colsedIcon.svg'
import { TYPE } from 'theme'
import { Line } from 'components/Line'
import { PinnedContentButton } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { useLBPPurchasedShares } from 'state/lbp/hooks'
import { useLBPContract } from 'hooks/useContract'

interface RedeemedProps {
  contractAddress: string | null
  shareLogo: any
  shareName: string
}

const RedeemedSideBar: React.FC<RedeemedProps> = ({ contractAddress, shareLogo, shareName }) => {
  const { account } = useActiveWeb3React()
  const getLBPPurchasedShares = useLBPPurchasedShares(contractAddress || '', account)
  const lbpContractInstance = useLBPContract(contractAddress ?? '')

  const handleRedeem = async () => {
    if (!lbpContractInstance) return

    try {
      const receipt = await lbpContractInstance.redeem(account, false)
      console.log('Redeem transaction receipt:', receipt)
    } catch (error) {
      console.error('Error redeeming tokens:', error)
    }
  }

  console.log(getLBPPurchasedShares.shareBalance, 'getLBPPurchasedShares')
  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          Closed
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
          <RedeemedText>
            <TYPE.description2 fontWeight={'400'} color={'#8F8FB2'}>
              Redeemed Project Tokens
            </TYPE.description2>
            <TYPE.description7 color={'#292933'}>{getLBPPurchasedShares?.shareBalance}</TYPE.description7>
          </RedeemedText>
          <RedeemedText>
            <ShareTokenWrapper>
              <img style={{ borderRadius: '100%' }} width="25px" height="25px" src={shareLogo?.public} />
              <TYPE.label style={{ inlineSize: 'max-content', alignSelf: 'center' }} fontSize={'14px'}>
                {shareName}
              </TYPE.label>
            </ShareTokenWrapper>
          </RedeemedText>
        </ShareWrapper>
        <Line style={{ margin: '20px 8px' }} />
        <PinnedContentButton
          onClick={handleRedeem}
          disabled={parseFloat(getLBPPurchasedShares.shareBalance || '') === 0}
          margin={'0px 15px'}
        >
          Redeem
        </PinnedContentButton>

        {/* <PinnedContentButton
          style={{ border: '1px solid #1FBA6680', background: '#E9F8F0', color: '#1FBA66' }}
          margin={'0px 15px'}
        >
          <Checked style={{ marginRight: '5px' }} /> Redeemed
        </PinnedContentButton> */}
      </MiddleSection>
    </SideBarContainer>
  )
}

export default RedeemedSideBar

const ShareTokenWrapper = styled.div`
  border: 1px solid #e6e6ff;
  padding: 10px 18px;
  display: flex;
  gap: 5px;
  border-radius: 6px;
`

const RedeemedText = styled.div`
  display: block;
  text-align: left;
  align-content: center;
`

const ShareWrapper = styled.div`
  display: flex;
  margin: 0px 15px;
  justify-content: space-between;
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
