// @flow
import React, { useState } from 'react'
import { Grid, ListItem, Radio } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

interface DeclarationItemProps {
  children: React.ReactNode
  answerable?: boolean
  name: string
  value: boolean | null
  editMode: boolean
}

const DeclarationItem = ({
  children,
  answerable = false,
  name,
  value,
  editMode
}: DeclarationItemProps) => {
  const { register } = useFormContext() || { control: {}, register: () => {} }
  const [selected, setSelected] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value === 'Yes')
  }

  return (
    <ListItem key={name}>
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={10}>
          {children}
        </Grid>
        {answerable && (
          <>
            <Grid
              container
              item
              xs={1}
              justify='center'
              direction='column'
              alignItems='center'
            >
              Yes
              <Radio
                disabled={!editMode}
                name={`declarations.${name}`}
                checked={!!selected}
                inputRef={register({ required: true })}
                onChange={handleChange}
                value='Yes'
                inputProps={{ 'aria-label': 'Yes' }}
              />
            </Grid>
            <Grid
              container
              item
              xs={1}
              justify='center'
              direction='column'
              alignItems='center'
            >
              No
              <Radio
                disabled={!editMode}
                name={`declarations.${name}`}
                checked={!selected}
                inputRef={register({ required: true })}
                onChange={handleChange}
                value='No'
                inputProps={{ 'aria-label': 'No' }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </ListItem>
  )
}

export default DeclarationItem
