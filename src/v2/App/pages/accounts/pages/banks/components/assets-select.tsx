import React, { useEffect } from 'react'
import { useStore } from '../../../../../../context/assets'
import { noop } from 'lodash'
import { useObserver } from 'mobx-react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlProps
} from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

interface AssetsSelectProps {
  fullWidth?: boolean
  required?: boolean
  name?: string
}

const AssetsSelect = ({
  fullWidth = true,
  required = false,
  name = 'asset',
  ...others
}: Partial<AssetsSelectProps> & FormControlProps) => {
  const assetsStore = useStore()
  const methods = useFormContext() || { errors: {}, control: () => {} }

  useEffect(() => {
    assetsStore
      .getCurrencies()
      .then(noop)
      .catch(noop)
  }, [assetsStore])

  return useObserver(() => {
    return (
      <FormControl
        {...others}
        fullWidth={fullWidth}
        style={{ minWidth: '75px' }}
        required={required}
        error={!!methods.errors.asset}
      >
        <InputLabel id='select-asset'>Currency</InputLabel>
        <Controller
          required={required}
          as={Select}
          id='select-asset'
          name={name}
          control={methods.control}
          onChange={([e]) => e.target.value}
          defaultValue=''
          rules={{ required }}
        >
          <MenuItem disabled value={undefined}>
            Currency
          </MenuItem>
          {assetsStore.currencies.map((e) => (
            <MenuItem key={e._id} value={e._id}>
              {e.numberFormat.currency}
            </MenuItem>
          ))}
        </Controller>
      </FormControl>
    )
  })
}

export default AssetsSelect
