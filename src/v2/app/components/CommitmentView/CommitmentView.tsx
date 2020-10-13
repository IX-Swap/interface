import React, { useState, useEffect } from 'react'
import { CommitmentViewHeader } from 'v2/app/components/CommitmentView/components/CommitmentViewHeader'
import NumberFormat from 'react-number-format'
import { Commitment as ICommitment } from 'v2/types/commitment'
import {
  Container,
  Box,
  Paper,
  Grid,
  Button,
  TextField
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { downloadFile } from 'v2/helpers/httpRequests'
import { noop } from 'lodash'

interface CommitmentProps {
  data: ICommitment
  editMode?: boolean
}

const NumberFormatCustom = ({ symbol, ...others }: any) => (
  <NumberFormat
    decimalScale={2}
    fixedDecimalScale
    thousandSeparator
    {...others}
    allowEmptyFormatting
    inputMode='numeric'
    isNumericString
    prefix={`${symbol as string}  `}
  />
)

export const CommitmentView = (props: CommitmentProps) => {
  const { editMode = false, data } = props
  const history = useHistory()
  const [estimatedValue, setEstimatedValue] = useState(0)
  const [numberOfUnits, setNumberOfUnits] = useState(
    Number.isInteger(data?.numberOfUnits) ? data.numberOfUnits : 0
  )
  const { register, handleSubmit, watch, errors, control } = useForm({
    defaultValues: {
      ...data,
      otp: ''
    }
  })

  useEffect(() => {
    setEstimatedValue(numberOfUnits * data.pricePerUnit)
  }, [numberOfUnits, data])

  useEffect(() => {
    setEstimatedValue(numberOfUnits * data.pricePerUnit)
    // run on start
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (data !== undefined) {
      const amount = watch('totalAmount')
      if (Number.isInteger(amount)) {
        setNumberOfUnits(amount / data.pricePerUnit)
      }
    }
  }, [data, watch])

  const onSubmit = (data: any) => {
    console.log('submit', data)
  }

  const onClickDownload = (doc: string) => {
    downloadFile(doc).then(noop).catch(noop)
  }

  const saving = false

  if (data === undefined) {
    return null
  }

  return (
    <Container>
      <Box component={Paper} p={4}>
        <CommitmentViewHeader
          dso={data.dso}
          currency={data.currency}
          estimated={estimatedValue}
        />
        <Grid container alignItems='center' direction='column'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width='400px' p={4} mt={4}>
              <Box mb={2}>
                <Button
                  variant='contained'
                  color='primary'
                  component={Button}
                  fullWidth
                  disabled={false}
                  onClick={() => {
                    onClickDownload(
                      `/issuance/dso/dataroom/subscription/raw/${data.dso._id}`
                    )
                  }}
                >
                  Download Subscription Document
                </Button>
              </Box>

              <Box mb={2}>
                <Button
                  variant='contained'
                  component={Button}
                  fullWidth
                  disabled={false}
                  onClick={() => {
                    onClickDownload(
                      `/issuance/commitment/dataroom/subscription/signed/raw/${data._id}`
                    )
                  }}
                >
                  Download Signed Subscription Document
                </Button>
              </Box>

              <Controller
                name='totalAmount'
                control={control}
                as={
                  <TextField
                    error={errors.totalAmount === null}
                    fullWidth
                    disabled={saving || !editMode}
                    label='Investment Amount'
                    style={{ marginBottom: '1em' }}
                    inputProps={{
                      symbol: data.currency.numberFormat.currency
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    // this is not duplicate
                    // eslint-disable-next-line
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                  />
                }
                rules={{
                  required: 'required'
                }}
                onChange={(
                  e: React.ChangeEvent<{
                    name?: string | undefined
                    value: unknown
                  }>
                ) => {
                  return e.target.value
                }}
              />

              <Controller
                name='pricePerUnit'
                control={control}
                as={
                  <TextField
                    error={errors.totalAmount === null}
                    fullWidth
                    disabled={saving || !editMode}
                    label='Unit Price'
                    style={{ marginBottom: '1em' }}
                    // disabled={!editMode}
                    inputProps={{
                      symbol: data.currency.numberFormat.currency
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    // this is not duplicate
                    // eslint-disable-next-line
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                  />
                }
                rules={{
                  required: 'required'
                }}
                onChange={(
                  e: React.ChangeEvent<{
                    name?: string | undefined
                    value: unknown
                  }>
                ) => {
                  // actually you can just return the value, instead of setValue
                  return e.target.value
                }}
              />

              <TextField
                error={errors.numberOfUnits === null}
                name='numberOfUnits'
                inputRef={register({ required: true })}
                fullWidth
                type='number'
                label='Number of Units'
                style={{ marginBottom: '1em' }}
                disabled={!editMode}
              />

              <TextField
                error={errors.walletAddress === null}
                name='walletAddress'
                inputRef={register({ required: true })}
                fullWidth
                label='Destination Wallet Address'
                style={{ marginBottom: '2em' }}
                disabled={!editMode}
              />

              {editMode && (
                <TextField
                  error={errors.otp === null}
                  name='otp'
                  fullWidth
                  autoComplete='off'
                  inputRef={register({ required: true })}
                  variant='outlined'
                  label='OTP'
                  style={{ marginBottom: '1em' }}
                  disabled={saving}
                />
              )}
            </Box>

            <Box width='400px'>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {editMode ? (
                    <Button
                      fullWidth
                      variant='contained'
                      color='secondary'
                      size='large'
                      type='submit'
                      disabled={saving}
                    >
                      Invest
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant='contained'
                      color='secondary'
                      size='large'
                      type='button'
                      disabled={saving || data.status !== 'Unauthorized'}
                      onClick={e => {
                        e.preventDefault()
                        if (!editMode) {
                          alert('Feature not yet available')
                        }
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant='contained'
                    size='large'
                    onClick={() => history.goBack()}
                    disabled={saving}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Grid>
      </Box>
    </Container>
  )
}
