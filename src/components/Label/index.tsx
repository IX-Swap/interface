import React, { FC } from 'react'
import { Label as RebassLabel } from '@rebass/forms'
import styled from 'styled-components'

import { MouseoverTooltip } from 'components/Tooltip'
import { TYPE } from 'theme'
import { ReactComponent as Info } from 'assets/images/info-filled.svg'

export interface Props {
  label: string | JSX.Element
  marginBottom?: string
  htmlFor?: string
  required?: boolean
  tooltipText?: string | JSX.Element
}

export const Label: FC<Props> = ({ label, marginBottom, htmlFor, tooltipText, required = false }) => (
  <RebassLabel marginBottom={marginBottom ?? '8px'} htmlFor={htmlFor}>
    <TYPE.title11 color="text2">{label}</TYPE.title11>
    {required && (
      <TYPE.title11 fontWeight={400} color="error">
        *
      </TYPE.title11>
    )}
    {tooltipText && (
      <MouseoverTooltip style={{ height: '20px' }} text={tooltipText}>
        <StyledInfo />
      </MouseoverTooltip>
    )}
  </RebassLabel>
)

const StyledInfo = styled(Info)`
  margin-left: 8px;
  cursor: pointer;
`
