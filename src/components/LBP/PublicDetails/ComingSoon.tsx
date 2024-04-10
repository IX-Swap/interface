import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/comingSoon.svg'
import { TYPE } from 'theme'
import { Button } from 'rebass'

export default function ComingSoon() {
  const [days, setDays] = useState(2);
  const [hours, setHours] = useState(18);
  const [minutes, setMinutes] = useState(12);
  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          if (hours > 0) {
            setSeconds(59);
            setMinutes(59);
            setHours(hours - 1);
          } else {
            if (days > 0) {
              setSeconds(59);
              setMinutes(59);
              setHours(23);
              setDays(days - 1);
            } else {
              clearInterval(interval);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [days, hours, minutes, seconds]);

  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          Coming Soon
        </TYPE.body5>
        <TYPE.subHeader1 margin={'15px 0px'} color={'#292933'}>
          Starts in
        </TYPE.subHeader1>
        <TimeContainer>
          <TimeItem>
            <TYPE.description7 color={'#6666FF'}>{days}</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Days</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#6666FF'}>{hours}</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Hours</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#6666FF'}>{minutes}</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Mins</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#6666FF'}>{seconds}</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Secs</TYPE.description3>
          </TimeItem>
        </TimeContainer>
        <DesContainer>
          <TYPE.description3>
            This LBP is coming soon. Check back soon and stay up to date.
          </TYPE.description3>
        </DesContainer>
        <ButtonStyle>Coming Soon</ButtonStyle>
      </MiddleSection>
    </SideBarContainer>
  );
}

const ButtonStyle = styled.button`
  border: 1px solid #6666FF33;
  color: #6666FF;
  border-radius: 8px;
  padding: 15px 30px;
  background: #F0F0FF;
  margin-top: 30px;
  cursor: pointer;
`;

const DesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 0px 67px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 76px;
  background-color: #e5e5ff;
  margin: 7px 10px;
`;

const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

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
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const MiddleSection = styled.div`
  margin: 20px 0;
  background: #ffffff;
  text-align: center;
`;

const ContentColumn = styled(ColumnCenter)`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @media (min-width: 768px) {
    & + & {
      margin-left: 20px;
    }
  }
`;
