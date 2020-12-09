import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { capitalStructures } from 'config/defaults'

export const CapitalStructureSelect = (props: any) => {
  return (
    <Select {...props} style={{ minWidth: 100 }}>
      <MenuItem disabled value={undefined}>
        Capital Structure
      </MenuItem>
      {capitalStructures.map(c => (
        <MenuItem value={c} key={c}>
          {c}
        </MenuItem>
      ))}
    </Select>
  )
}
