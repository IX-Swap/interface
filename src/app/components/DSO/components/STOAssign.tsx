import { Grid, Tooltip } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IssuerAssigneeSelect } from 'components/form/IssuerAssigneeSelect'
import { TypedField } from 'components/form/TypedField'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export const STOAssign = (props: any) => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item sx={{ display: 'flex' }}>
          <FormSectionHeader
            hasBorderBottom={false}
            title='Assign Issuer to STO'
            variant='h5'
          />
          <Tooltip
            sx={{
              cursor: 'pointer',
              marginLeft: '5px',
              width: '20px',
              height: '20px'
            }}
            arrow
            placement={'right-start'}
            title={
              'Assign this STO to an issuer. Only Authorizers can view and take this action'
            }
            enterTouchDelay={0}
          >
            <InfoOutlinedIcon></InfoOutlinedIcon>
          </Tooltip>
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={12}>
              <TypedField
                control={control}
                component={IssuerAssigneeSelect}
                label='Issuer Assignee'
                InputProps={{
                  data: props?.corporateData,
                  editableData: props.editableData
                }}
                name=''
                valueExtractor={numericValueExtractor}
                helperText='Select Issuer Assignee'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
