import React from 'react'
import { MenuItem, TextField, TextFieldProps } from '@material-ui/core'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export const DSOSelect = (
  props: Partial<TextFieldProps>
): JSX.Element | null => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOsByUserId()

  if (!isSuccess || data.list.length === 0) {
    return null
  }

  return (
    <TextField
      select
      InputLabelProps={{ shrink: false }}
      margin='normal'
      variant='outlined'
      fullWidth
      value={dsoId}
      {...props}
      style={{ minWidth: 80 }}
    >
      {data.list.map(({ _id, tokenName }) => (
        <MenuItem key={_id} value={_id}>
          {tokenName}
        </MenuItem>
      ))}
    </TextField>
  )
}
