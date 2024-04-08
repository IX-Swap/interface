import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg';
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg';
import { TYPE } from 'theme';
import { PinnedContentButton } from 'components/Button';

const BuySellFieldsWrapper = styled.div`
  text-align: left;
  margin-right: 60px;
`;

const BuySellFieldsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e6e6ff;
  background: #f7f7fa;
  padding: 12px 18px 0px 18px;
  margin-bottom: 20px;
`;

const BuySellFieldsItem = styled.div`
  margin-bottom: 8px;
`;

const BuySellFieldsSelect = styled.div`
  flex: 1;
  display: flex;
  border: none;
  padding: 8px;
  margin-right: 8px;
  background: #ffffffff;
  align-items: center;
  gap: 4px;
`;

const BuySellFieldsSpan = styled.span`
  color: #8f8fb2;
  font-size: 12px;

  text-align: left;

  width: fit-content;
  margin: 0 auto;
`;

const BuySellFieldsSpanBal = styled.span`
  display: flex;
  color: #8f8fb2;
  font-size: 12px;
  padding: 8px;
  margin-top: 8px;
  gap: 3px;
`;

const BuySellFieldsInput = styled.input`
  border: none;
  padding: 8px;
  text-align: left;
  background: none;
  font-size: 32px;
  font-weight: 700;
  color: #292933;
  max-width: 210px;
  width: auto;
  margin-bottom: 10px;
  outline: none;

  &::placeholder {
    font-size: 32px;
    color: #bdbddb;
    font-weight: 700;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

const TabRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const SlippageWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const AddWalletText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #6666ff;
  margin-top: 16px;
`;

export default function BuySellFields() {
  const [shareValue, setShareValue] = useState('');
  const [assetValue, setAssetValue] = useState('');

  const handleShareInputChange = (event: any) => {
    const inputValue = event.target.value;
    setShareValue(inputValue);
    setAssetValue(inputValue !== '' ? (parseFloat(inputValue) / 2).toFixed(2) : '');
  };

  const handleAssetInputChange = (event: any) => {
    const inputValue = event.target.value;
    setAssetValue(inputValue);
    setShareValue(inputValue !== '' ? (parseFloat(inputValue) * 2).toFixed(2) : '');
  };

  return (
    <>
      {/* Share section */}
      <BuySellFieldsContainer>
        <BuySellFieldsItem>
          <BuySellFieldsWrapper>
            <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Share</BuySellFieldsSpan>
          </BuySellFieldsWrapper>
          <BuySellFieldsInput 
            type="text" 
            placeholder="0.00" 
            name="ShareInput" 
            value={shareValue} 
            onChange={handleShareInputChange} 
          />
        </BuySellFieldsItem>
        <BuySellFieldsItem>
          <BuySellFieldsSelect>
            <Serenity />
            <TYPE.body4 fontSize={'14px'}> Serenity</TYPE.body4>
          </BuySellFieldsSelect>
          <BuySellFieldsSpanBal>
            Balance: <b style={{ color: '#292933' }}>4,000.00</b>
          </BuySellFieldsSpanBal>
        </BuySellFieldsItem>
      </BuySellFieldsContainer>

      {/* Asset section */}
      <BuySellFieldsContainer>
        <BuySellFieldsItem>
          <BuySellFieldsWrapper>
            <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Asset</BuySellFieldsSpan>
          </BuySellFieldsWrapper>
          <BuySellFieldsInput 
            type="text" 
            placeholder="0.00" 
            name="assetInput" 
            value={assetValue} 
            onChange={handleAssetInputChange} 
          />
        </BuySellFieldsItem>
        <BuySellFieldsItem>
          <BuySellFieldsSelect>
            <USDC />
            <TYPE.body4 fontSize={'14px'}> USDC</TYPE.body4>
          </BuySellFieldsSelect>
          <BuySellFieldsSpanBal>
            Balance: <b style={{ color: '#292933' }}>1,000.00</b>
          </BuySellFieldsSpanBal>
        </BuySellFieldsItem>
      </BuySellFieldsContainer>

      <TabRow>
        <SlippageWrapper>
          <TYPE.body3>Fees: </TYPE.body3>
          <TYPE.body3 color={'#292933'} fontWeight={'700'}>
            0.5%
          </TYPE.body3>
        </SlippageWrapper>
        <SlippageWrapper>
          <TYPE.body3>Price Impact: </TYPE.body3>
          <TYPE.body3 color={'#292933'} fontWeight={'700'}>
            0.5%
          </TYPE.body3>
        </SlippageWrapper>
      </TabRow>

      <TabRow style={{marginTop: '20px'}}>
        <PinnedContentButton disabled>Buy</PinnedContentButton>
      </TabRow>
      <AddWalletText>Add Asset to Wallet</AddWalletText>
    </>
  );
}
