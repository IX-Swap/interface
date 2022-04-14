import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { FUNDSOURCES_OPTS } from 'app/pages/identity/const'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const FundSourceSelect = (props: any): JSX.Element => {
  return (
    <TextFieldSelect {...props}>
      <SelectItem disabled value={undefined}>
        Source of funds
      </SelectItem>
      {renderSelectItems(FUNDSOURCES_OPTS)}
    </TextFieldSelect>
  )
}

FundSourceSelect.displayName = 'TextField_FundSourceSelect'
