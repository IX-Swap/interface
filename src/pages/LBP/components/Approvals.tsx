import styled from 'styled-components';
import React from 'react';
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg';
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  border: 1px solid #E6E6FF;
  border-radius: 6px;
  width: calc(50% - 10px); 
  height: 200px;
  margin: 5px; 
  @media (max-width: 768px) {
    width: calc(100% - 20px); 
    max-width: 350px; 
  }
`;

const Button = styled.button`
  border: 1px solid #E6E6FF;
  color: #6666FF;
  width: 250px;
  height: 48px;
  border-radius: 6px;
  background-color: #FFFFFF;
  cursor: pointer;
  font-size: 16px;
`;

export default function Approvals() {
  return (
    <CardContainer>
      <Card>
        <USDC />
        <p style={{color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center'}}>Approve Serenity</p>
        <Button>Approve Share</Button>
      </Card>
      <Card>
        <Serenity />
        <p style={{color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center'}}>Approve USDC</p>
        <Button>Approve Asset</Button>
      </Card>
    </CardContainer>
  );
}
