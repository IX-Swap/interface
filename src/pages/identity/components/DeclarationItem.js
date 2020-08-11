//
import React, { useState } from 'react'

import { Grid, ListItem, Radio } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

const DeclarationItem = ({
  children,
  answerable = false,
  name,
  value,
  editMode
}) => {
  const { register } = useFormContext()
  const [selected, setSelected] = useState(value)

  const handleChange = e => {
    setSelected(e.target.value)
  }

  return (
    <ListItem>
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
                checked={selected === 'Yes'}
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
                checked={selected === 'No'}
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
