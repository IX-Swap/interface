import React from 'react'
import DsoImage from '../image'
import { Dso } from '../../../../types/dso'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import useEditableStyles from './styles'
import AssetsSelect from '../../../accounts/pages/banks/components/assets-select'
import CorporateSelector from '../../corporate-selector'

interface DsoTitleProps {
  dso: Dso
  editMode?: boolean
}

const DsoTitle = ({ editMode = false, dso }: DsoTitleProps) => {
  const classesE = useEditableStyles()
  const { register, errors, control } = useFormContext() || {
    control: () => {},
    errors: {},
    register: () => {}
  }

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <DsoImage dsoId={dso._id} editMode={editMode} />
      </Grid>
      <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
        <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            label='Token Name'
            margin='normal'
            name='tokenName'
            error={!!errors.tokenName}
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
            error={!!errors.tokenSymbol}
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
            error={!!errors.issuerName}
            label='Issuer Name'
            margin='normal'
            style={{ flexGrow: 1 }}
          />
          <AssetsSelect
            className={classesE.currency}
            required
            margin='normal'
            name='currency'
            error={!!errors.currency}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DsoTitle
