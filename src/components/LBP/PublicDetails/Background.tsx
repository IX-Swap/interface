import React from 'react';
import styled, { css } from 'styled-components';
import backgroundImg from '../../../assets/images/background.jpg';
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg';
import { ReactComponent as ArrowUp } from '../../../assets/images/varyArrow.svg';
import { TYPE } from 'theme';

const FullWidthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 400px;
  overflow: hidden;
`;

const FullWidthImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SerenityIcon = styled(Serenity)`
  position: absolute;
  bottom: 20%;
  left: 5%;
  height: 15%;
  width: 15%;
`;

const Description = styled(TYPE.description7)`
  position: absolute;
  bottom: 22%;
  left: 15.5%;
  color: #FFFFFF;
`;

const Amount = styled(TYPE.description7)`
  position: absolute;
  bottom: 22%;
  right: 10%;
  color: #FFFFFF;
`;

const Vary = styled.div<{ positive: boolean }>`
  position: absolute;
  bottom: 23%;
  right: 18.5%;
  color: #FFFFFF;
  padding: 8px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  ${({ positive }) => positive ? `
    background: #1FBA66;
  ` : `
    background: #FF6161;
  `}
`;

const Arrow = styled.div<{ rotateArrow?: boolean }>`
  margin-right: 5px;
  ${({ rotateArrow }) =>
    rotateArrow &&
    css`
      transform: rotate(180deg);
    `}
`;

export default function Background() {
  const varyValue = 3.28; 
  const isPositive = varyValue > 0;

  return (
    <FullWidthContainer>
      <FullWidthImage src={backgroundImg} alt="Background" />
      <SerenityIcon />
      <Description fontSize={'48px'}>Serenity</Description>
      <Amount fontSize={'40px'}>$1.32</Amount>
      <Vary positive={isPositive}>
        <Arrow rotateArrow={!isPositive}>
          <ArrowUp />
        </Arrow>
        {Math.abs(varyValue)}%
      </Vary>
    </FullWidthContainer>
  );
}
