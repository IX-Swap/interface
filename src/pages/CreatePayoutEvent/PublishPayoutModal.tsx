import React, { FC } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSGradient } from 'components/Button'
import CurrencyLogo from 'components/CurrencyLogo'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'

interface Props {
  close: () => void
}

interface DataProps {
  label: string
  value: any
}

export const PublishPayoutModal: FC<Props> = ({ close }) => {
  return (
    <RedesignedWideModal scrollable isOpen onDismiss={close}>
      <ModalBlurWrapper data-testid="user-modal" style={{ maxWidth: '569px', width: '100%', position: 'relative' }}>
        <ModalHeader>
          <Title>
            <Trans>Payout Event Summary</Trans>
            <CloseIcon data-testid="cross" onClick={close} />
          </Title>
          <Subtitle>
            {t`Please review all the information and ensure they are correct before publishing the event.`}
          </Subtitle>
        </ModalHeader>

        <ModalBody>
          <Card marginBottom="18px">
            <span>{t`Payout Information:`}</span>
            <Data
              label={t`Security Token:`}
              value={
                <Flex alignItems="center">
                  <CurrencyLogo size="20px" />
                  <Box marginLeft="4px"> {`TESLA`}</Box>
                </Flex>
              }
            />
            <Data label={t`Payout Type:`} value={t`Dividends`} />
            <Data label={t`Record Date:`} value={t`Mar 12, 2022`} />
            <Data label={t`Payment Start Date:`} value={t`May 22, 2022`} />
          </Card>
          <Card marginBottom="24px">
            <span>{t`Payment Details:`}</span>
            <Data
              label={t`Payout Tokens:`}
              value={
                <Flex alignItems="center">
                  <CurrencyLogo size="20px" />
                  <Box marginX="4px"> {`TESLA`}</Box>
                  <Box>{`1000`}</Box>
                </Flex>
              }
            />
          </Card>

          <Column style={{ gap: '16px', marginBottom: 32 }}>
            <Checkbox
              name="accredited"
              isRadio
              checked={false}
              onClick={() => null}
              label={
                <Box>
                  <TYPE.body3 fontWeight={700}>{t`Pay Now for This Event`}</TYPE.body3>
                  <TYPE.description2
                    fontStyle={'italic'}
                  >{t`Indicated token amount will be allocated for distribution once payment for this event is confirmed.`}</TYPE.description2>
                </Box>
              }
            />
            <Checkbox
              name="accredited"
              isRadio
              checked={false}
              onClick={() => null}
              label={
                <Box>
                  <TYPE.body3 fontWeight={700}>{t`Pay Later for This Event`}</TYPE.body3>
                  <TYPE.description2
                    fontStyle={'italic'}
                  >{t`Payment for this event should be received and confirmed prior to the start date of payout distribution.`}</TYPE.description2>
                </Box>
              }
            />
          </Column>

          <StyledButtonIXSGradient width="100%">{t`Confirm Payment`}</StyledButtonIXSGradient>
        </ModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Data: FC<DataProps> = ({ label, value }) => {
  return (
    <Wrapper>
      <div>{label}</div>
      <div>{value}</div>
    </Wrapper>
  )
}

const ModalHeader = styled(ModalContentWrapper)`
  border-radius: 20px 20px 0px 0px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-bottom: 1px solid rgba(39, 32, 70, 0.72);
`

const Subtitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.text9};
  justify-content: space-between;
  padding: 12px 64px;
`

const ModalBody = styled.div`
  background: ${({ theme }) => theme.bg11};
  padding: 24px;
  border-radius: 0px 0px 20px 20px;
`

const Card = styled(Box)`
  background: ${({ theme }) => theme.bgG4};
  border-radius: 20px;
  padding: 16px;

  > span {
    display: block;
    padding-bottom: 4px;
    color: ${({ theme }) => theme.text2};
    border-bottom: ${({ theme }) => `1px solid ${theme.text9}`};
    margin-bottom: 12px;
  }

  > :last-child {
    margin-bottom: 0px;
  }
`

const StyledButtonIXSGradient = styled(ButtonIXSGradient)`
  min-height: 40px;
  max-height: 40px;
  font-size: 16px;
  width: 100%;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 400;

  > :first-child {
    color: ${({ theme }) => theme.text9};
  }

  > :last-child {
    font-weight: 500;
  }
`
