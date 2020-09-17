import React from 'react'
import { DSOImage } from 'v2/app/components/DSO/DSOImage'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import useEditableStyles from './styles'
import { CorporateSelector } from 'v2/app/components/CorporateSelector'

interface DSOTitleProps {
  dso: DigitalSecurityOffering
  editMode?: boolean
}

export const DSOTitle = (props: DSOTitleProps) => {
  const { editMode = false, dso } = props
  const classesE = useEditableStyles()
  const { register, errors, control } = useFormContext()

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <DSOImage dsoId={dso._id} editMode={editMode} />
      </Grid>
      <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
        <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            label='Token Name'
            margin='normal'
            name='tokenName'
            error={errors.tokenName !== undefined}
            inputRef={register({ required: true })}
            InputLabelProps={{
              className: classesE.largeInputLabel
            }}
            InputProps={{
              className: classesE.largeInputValue
            }}
          />
          <TextField
            label='Symbol'
            margin='normal'
            name='tokenSymbol'
            error={errors.tokenSymbol !== undefined}
            inputRef={register({ required: true })}
            className={classesE.tokenSymbol}
            InputLabelProps={{
              className: classesE.largeInputLabel
            }}
            InputProps={{
              className: classesE.largeInputValue
            }}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name='launchDate'
              defaultValue=''
              control={control}
              render={props => (
                <DatePicker
                  {...props}
                  className={classesE.launchDate}
                  margin='normal'
                  label='Launch Date'
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  views={['year', 'month', 'date']}
                  InputLabelProps={{
                    className: classesE.largeInputLabel
                  }}
                  InputProps={{
                    className: classesE.largeInputValue
                  }}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
          <CorporateSelector />
          <TextField
            className={classesE.issuer}
            inputRef={register({ required: true })}
            name='issuerName'
            error={errors.issuerName !== undefined}
            label='Issuer Name'
            margin='normal'
            style={{ flexGrow: 1 }}
          />
          {/* <AssetsSelect */}
          {/*  className={classesE.currency} */}
          {/*  required */}
          {/*  margin='normal' */}
          {/*  name='currency' */}
          {/*  error={!!errors.currency} */}
          {/* /> */}
        </Grid>
      </Grid>
    </Grid>
  )
}
