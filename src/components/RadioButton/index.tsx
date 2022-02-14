import React, { FC } from 'react'
import { Flex } from 'rebass'

import { ButtonText } from 'components/Button'
import { TYPE } from 'theme'

import { ReactComponent as Checked } from 'assets/images/checked_solid.svg'
import { ReactComponent as NotChecked } from 'assets/images/not_checked_solid.svg'

interface Props {
  label: string
  checked: boolean
  onClick: () => void
}

export const RadioButton: FC<Props> = ({ label, checked, onClick }: Props) => {
  return (
    <ButtonText style={{ textDecoration: 'none', textAlign: 'inherit' }} onClick={onClick}>
      <Flex>
        <div>{checked ? <Checked /> : <NotChecked />}</div>
        <TYPE.body3 marginLeft="8px">{label}</TYPE.body3>
      </Flex>
    </ButtonText>
  )
}
