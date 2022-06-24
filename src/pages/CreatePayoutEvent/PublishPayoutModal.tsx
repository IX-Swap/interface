import React, { FC } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSGradient } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { momentFormatDate } from 'pages/PayoutItem/utils'
import { useAddPopup } from 'state/application/hooks'
import { usePublishPayout } from 'state/payout/hooks'

import { transformPayoutDraftDTO } from './utils'

interface Props {
  close: () => void
  values: any
  isRecordFuture: boolean
}

interface DataProps {
  label: string
  value: any
}

export const PublishPayoutModal: FC<Props> = ({ values, isRecordFuture, close }) => {
  const { token, secToken, tokenAmount, recordDate, startDate, endDate, type } = values
  const publishPayout = usePublishPayout()
  const addPopup = useAddPopup()
  const history = useHistory()

  const handleFormSubmit = async () => {
    const body = transformPayoutDraftDTO(values)
    const data = await publishPayout(body)

    if (data?.id) {
      close()
      addPopup({
        info: {
          success: true,
          summary: 'Payout was successfully published',
        },
      })
      history.push(`/payout/${data.id}`)
    }
  }

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
                  {secToken.icon}
                  <Box marginLeft="4px"> {secToken.label}</Box>
                </Flex>
              }
            />
            <Data label={t`Payout Type:`} value={type} />
            <Data label={t`Record Date:`} value={momentFormatDate(recordDate)} />
            <Data label={t`Payment Start Date:`} value={momentFormatDate(startDate)} />
            {endDate && <Data label={t`Payment Deadline:`} value={momentFormatDate(endDate)} />}
          </Card>
          <Card marginBottom="24px">
            <span>{t`Payment Details:`}</span>
            {isRecordFuture ? (
              <TYPE.title10 padding="0px 32px" color={'error'} textAlign="center">
                {t`Wrapped token amounts to be computed and will become available on the Record Date you selected`}
              </TYPE.title10>
            ) : (
              <Data
                label={t`Payout Tokens:`}
                value={
                  <Flex alignItems="center">
                    {token.icon}
                    <Box marginX="4px"> {token.label}</Box>
                    <Box>{tokenAmount}</Box>
                  </Flex>
                }
              />
            )}
          </Card>

          <Column style={{ gap: '16px', marginBottom: 32 }}>
            <Checkbox
              name="accredited"
              isRadio
              disabled
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
              checked={true}
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

          <StyledButtonIXSGradient
            type="button"
            onClick={handleFormSubmit}
          >{t`Publish Payout Event`}</StyledButtonIXSGradient>
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
