import React, { useContext } from 'react'
import { t, Trans } from '@lingui/macro'
import { Percent } from '@ixswap1/sdk-core'
import styled, { ThemeContext } from 'styled-components'

import QuestionHelper from '../QuestionHelper'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed, RowStart } from '../Row'
import { DEFAULT_DEADLINE_FROM_NOW } from 'constants/misc'
import { displayDeadline, displayUserSlippageTolerance } from './helpers'
import { useDeadline } from 'hooks/useDeadline'
import { useSlippage } from 'hooks/useSlippage'
import { TYPE } from 'theme'
import { Option, OptionRow, OptionCustom } from 'components/OptionButton'
import { Text } from 'rebass'

const Input = styled.input`
  background: ${({ theme }) => theme.bg1};
  font-weight: 600;
  font-size: 22px;
  line-height: 40px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align: right;
`
const Marginer = styled.div`
  margin-bottom: 1rem;
`
const SlippageEmojiContainer = styled.span`
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  `}
`

const MinuteLabel = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 33px;
  opacity: 0.5;
  color: ${({ theme }) => theme.text2};
`
const StyledOptionRow = styled(OptionRow)`
  justify-content: flex-start;
  margin-top: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: fit-content;
    display: flex;
    gap: 10px;
    margin-top: 0px;
  `}
`
const StyledOption = styled(Option)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: fit-content;
    padding: 10px;
    margin: 0;
  `}
`
const StyledOptionCustom = styled(OptionCustom)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 85px;
    max-width: 100px;
    padding: 10px;
    > div > input {
     text-align: left;
   }
  `}
`
interface TransactionSettingsProps {
  placeholderSlippage: Percent // varies according to the context in which the settings dialog is placed
}

export default function TransactionSettings({ placeholderSlippage }: TransactionSettingsProps) {
  const theme = useContext(ThemeContext)
  const { deadline, deadlineInput, deadlineError, parseCustomDeadline, resetDeadline } = useDeadline()
  const { userSlippageTolerance, slippageInput, slippageError, tooLow, tooHigh, resetSlippage, parseSlippageInput } =
    useSlippage()

  return (
    <AutoColumn gap="md">
      <Marginer>
        <AutoColumn gap="16px">
          <RowFixed>
            <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
              <Trans>Slippage tolerance</Trans>
            </TYPE.black>
            <QuestionHelper
              text={
                <Trans>
                  Your transaction will revert if the price changes unfavorably by more than this percentage. Value
                  range 0-50%
                </Trans>
              }
            />
          </RowFixed>
          <StyledOptionRow>
            <StyledOption
              key={'auto'}
              onClick={() => {
                parseSlippageInput('')
              }}
              active={userSlippageTolerance === 'auto'}
            >
              Auto
            </StyledOption>

            <StyledOptionCustom active={userSlippageTolerance !== 'auto'} warning={!!slippageError} tabIndex={-1}>
              <RowBetween>
                <Input
                  placeholder={placeholderSlippage.toFixed(2)}
                  value={displayUserSlippageTolerance({ slippageInput, userSlippageTolerance })}
                  onChange={(e) => {
                    parseSlippageInput(e.target.value)
                  }}
                  onBlur={() => resetSlippage()}
                  color={slippageError ? 'red' : ''}
                />
                <Text color={theme.text8} fontWeight={500} fontSize={22} lineHeight={'33px'}>
                  %
                </Text>
              </RowBetween>
            </StyledOptionCustom>
          </StyledOptionRow>
          {slippageError || tooLow || tooHigh ? (
            <RowStart
              style={{
                fontSize: '14px',
                paddingTop: '7px',
                gap: '5px',
                color: slippageError ? 'red' : '#F3841E',
              }}
            >
              {tooLow || tooHigh ? (
                <SlippageEmojiContainer>
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                </SlippageEmojiContainer>
              ) : null}
              {slippageError ? (
                <Trans>Enter a valid slippage percentage</Trans>
              ) : tooLow ? (
                <Trans>Your transaction may fail</Trans>
              ) : (
                <Trans>Your transaction may be frontrun</Trans>
              )}
            </RowStart>
          ) : null}
        </AutoColumn>
      </Marginer>
      <Marginer>
        <AutoColumn gap="sm">
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              <Trans>Transaction deadline</Trans>
            </TYPE.black>
            <QuestionHelper
              text={t`Your transaction will revert if it is pending for more than this period of time. Value range 1 - 180 min.`}
            />
          </RowFixed>
          <RowFixed>
            <StyledOptionCustom warning={!!deadlineError} tabIndex={-1}>
              <Input
                placeholder={(DEFAULT_DEADLINE_FROM_NOW / 60).toString()}
                value={displayDeadline({ deadlineInput, deadline })}
                onChange={(e) => parseCustomDeadline(e.target.value)}
                onBlur={() => resetDeadline()}
                color={deadlineError ? 'red' : ''}
              />
            </StyledOptionCustom>
            <TYPE.body style={{ paddingLeft: '8px' }} fontSize={14}>
              <MinuteLabel>
                <Trans>minutes</Trans>
              </MinuteLabel>
            </TYPE.body>
          </RowFixed>
          {deadlineError ? (
            <RowStart
              style={{
                fontSize: '14px',
                paddingTop: '7px',
                gap: '5px',
                color: 'red',
              }}
            >
              <Trans>Deadline range is 1-180 minutes</Trans>
            </RowStart>
          ) : null}
        </AutoColumn>
      </Marginer>
    </AutoColumn>
  )
}
