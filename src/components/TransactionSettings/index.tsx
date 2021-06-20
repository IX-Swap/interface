import React, { useContext } from 'react'
import { t, Trans } from '@lingui/macro'
import { Percent } from '@ixswap1/sdk-core'
import styled, { ThemeContext } from 'styled-components'

import QuestionHelper from '../QuestionHelper'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'
import { DEFAULT_DEADLINE_FROM_NOW } from 'constants/misc'
import { displayDeadline, displayUserSlippageTolerance } from './helpers'
import { useDeadline } from 'hooks/useDeadline'
import { useSlippage } from 'hooks/useSlippage'
import { RECOMMENDED_SLIPPAGE_OPTIONS } from './constants'
import { TYPE } from 'theme'
import { FancyButton, Option, OptionRow } from 'components/OptionButton'

const Input = styled.input`
  background: ${({ theme }) => theme.bg1};
  font-weight: 600;
  font-size: 22px;
  line-height: 40px;
  width: 100%;
  height: 100%;
  outline: none;
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
const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  max-width: 130px;
  height: 60px;
  position: relative;
  padding: 10px 22px;
  flex: 1;
  border: ${({ theme, active, warning }) =>
    warning ? `1px solid ${theme.red1}` : active ? `1px solid ${theme.popUpInputBorder}` : 'none'};
  :hover {
    border: ${({ theme, warning }) => (warning ? `1px solid ${theme.red1}` : `1px solid ${theme.popUpInputBorder}`)};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
  }
`

const SlippageEmojiContainer = styled.span`
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  `}
`

const MinuteLabel = styled.span`
  font-weight: 300;
  font-size: 22px;
  line-height: 33px;
  color: ${({ theme }) => theme.text6};
`
export interface TransactionSettingsProps {
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
        <AutoColumn gap="sm">
          <RowFixed>
            <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
              <Trans>Slippage tolerance</Trans>
            </TYPE.black>
            <QuestionHelper
              text={
                <Trans>
                  Your transaction will revert if the price changes unfavorably by more than this percentage.
                </Trans>
              }
            />
          </RowFixed>
          <OptionRow>
            {RECOMMENDED_SLIPPAGE_OPTIONS.map((slippageOption) => (
              <Option
                key={slippageOption}
                onClick={() => {
                  parseSlippageInput(slippageOption)
                }}
                active={slippageInput === slippageOption}
              >
                {slippageOption}%
              </Option>
            ))}

            <OptionCustom active={userSlippageTolerance !== 'auto'} warning={!!slippageError} tabIndex={-1}>
              <RowBetween>
                {tooLow || tooHigh ? (
                  <SlippageEmojiContainer>
                    <span role="img" aria-label="warning">
                      ⚠️
                    </span>
                  </SlippageEmojiContainer>
                ) : null}
                <Input
                  placeholder={placeholderSlippage.toFixed(2)}
                  value={displayUserSlippageTolerance({ slippageInput, userSlippageTolerance })}
                  onChange={(e) => {
                    parseSlippageInput(e.target.value)
                  }}
                  onBlur={() => resetSlippage()}
                  color={slippageError ? 'red' : ''}
                />
                %
              </RowBetween>
            </OptionCustom>
          </OptionRow>
          {slippageError || tooLow || tooHigh ? (
            <RowBetween
              style={{
                fontSize: '14px',
                paddingTop: '7px',
                color: slippageError ? 'red' : '#F3841E',
              }}
            >
              {slippageError ? (
                <Trans>Enter a valid slippage percentage</Trans>
              ) : tooLow ? (
                <Trans>Your transaction may fail</Trans>
              ) : (
                <Trans>Your transaction may be frontrun</Trans>
              )}
            </RowBetween>
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
              text={t`Your transaction will revert if it is pending for more than this period of time.`}
            />
          </RowFixed>
          <RowFixed>
            <OptionCustom warning={!!deadlineError} tabIndex={-1}>
              <Input
                placeholder={(DEFAULT_DEADLINE_FROM_NOW / 60).toString()}
                value={displayDeadline({ deadlineInput, deadline })}
                onChange={(e) => parseCustomDeadline(e.target.value)}
                onBlur={() => resetDeadline()}
                color={deadlineError ? 'red' : ''}
              />
            </OptionCustom>
            <TYPE.body style={{ paddingLeft: '8px' }} fontSize={14}>
              <MinuteLabel>
                <Trans>Minutes</Trans>
              </MinuteLabel>
            </TYPE.body>
          </RowFixed>
        </AutoColumn>
      </Marginer>
    </AutoColumn>
  )
}
