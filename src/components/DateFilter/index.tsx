import React, { FC, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { Select } from 'components/Select'

export type Props = {
  value: string | Date | number | null
  onChange: (value: any) => void
  selectBorderRadius?: string
}

export const DateFilter: FC<Props> = ({ value, selectBorderRadius, onChange }) => {
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(!open)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <DatePicker
      open={open}
      onClose={onClose}
      value={value}
      onChange={onChange}
      disableFuture
      openTo="date"
      renderInput={() => (
        <div style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={onClick} className="dropdown">
          <Select
            borderRadius={selectBorderRadius}
            value={null}
            placeholder={value?.toString() || 'By Date'}
            options={[]}
            onSelect={() => null}
            isDisabled
          />
        </div>
      )}
    />
  )
}
