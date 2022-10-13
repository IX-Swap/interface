/* eslint-disable */

import { SelectProps } from '@mui/material'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { queryStatusRenderer } from './renderUtils'
import { Icon } from 'ui/Icons/Icon'
import { useDisabledSelectComponent } from './useFormStyles/disabledSelectComponent'

interface CorporateSelectProps extends SelectProps {
  placeHolder?: string | undefined
  isDisabled?: boolean
}

export const CorporateSelect = (props: CorporateSelectProps) => {
  const { data, status } = useAllCorporates({ all: true, status: 'Approved' })
  const classes = useDisabledSelectComponent()

  const renderName = (value: any) => {
    const queryStatus = queryStatusRenderer(status)
    if (queryStatus !== undefined) return queryStatus
    return renderValue({
      value,
      list: data?.list,
      extractor: (item: CorporateIdentity) => item.companyLegalName
    })
  }
  return (
    <div className={props.isDisabled ? classes.root : ''}>
      <InputLabel>{props.label}</InputLabel>
      {props.isDisabled ? (
        <Icon color={'#7DD320'} name={'check'} className='svgCheck' />
      ) : null}
      <Select
        {...props}
        style={{ minWidth: 100 }}
        label={undefined}
        placeholder={String(props.placeHolder)}
        renderValue={renderName}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Select corporate
        </SelectItem>
        {data.list.map(({ _id, companyLegalName }) => (
          <SelectItem value={_id} key={_id}>
            {companyLegalName}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
CorporateSelect.displayName = 'Select_CorporateSelect'
