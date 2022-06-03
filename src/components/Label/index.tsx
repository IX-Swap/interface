import React, { FC } from 'react'
import { Label as RebassLabel } from '@rebass/forms'

import { TYPE } from 'theme'

interface Props {
  text: string | JSX.Element
  marginBottom?: string
  htmlFor?: string
  required?: boolean
}

export const Label: FC<Props> = ({ text, marginBottom, htmlFor, required = false}) => (
  <RebassLabel marginBottom={marginBottom ?? '11px'} htmlFor={htmlFor}>
    <TYPE.title11 color="text2">{text}</TYPE.title11>
    {required && <TYPE.title11 fontWeight={400} color="error">*</TYPE.title11>}
  </RebassLabel>
)
