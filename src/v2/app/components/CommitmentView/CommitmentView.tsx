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
import { Document } from 'v2/types/document'
import { useHistory } from 'react-router-dom'
import { downloadFile } from 'v2/helpers/httpRequests'
import { noop } from 'lodash'

interface CommitmentProps {
  commitment: ICommitment
  editMode?: boolean
}

const Uploader = ({
  onUploadSuccess
}: {
  onUploadSuccess: (doc: Document) => void
}) => {
  return <span>uploader</span>
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
  const { editMode = false, commitment } = props
  const history = useHistory()
  const [estimatedValue, setEstimatedValue] = useState(0)
  const [numberOfUnits, setNumberOfUnits] = useState(
    Number.isInteger(commitment?.numberOfUnits) ? commitment.numberOfUnits : 0
  )
  const { register, handleSubmit, watch, errors, control } = useForm({
    defaultValues: {
      ...commitment,
      otp: ''
    }
  })

  useEffect(() => {
    setEstimatedValue(numberOfUnits * commitment.pricePerUnit)
  }, [numberOfUnits, commitment])

  useEffect(() => {
    setEstimatedValue(numberOfUnits * commitment.pricePerUnit)
    // run on start
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (commitment !== undefined) {
      const amount = watch('totalAmount')
      if (Number.isInteger(amount)) {
        setNumberOfUnits(amount / commitment.pricePerUnit)
      }
    }
  }, [commitment, watch])

  const onSubmit = (data: any) => {
    console.log('submit', data)
  }

  const onClickDownload = (doc: string) => {
    downloadFile(doc).then(noop).catch(noop)
  }

  const setSubscriptionDocument = (doc: Document) => {
    console.log('doc', doc)
  }

  const saving = false

  return (
    <Container>
      <Box component={Paper} p={4}>
        <CommitmentViewHeader
          dso={commitment.dso}
          currency={commitment.currency}
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
                      `/issuance/dso/dataroom/subscription/raw/${commitment.dso._id}`
                    )
                  }}
                >
                  Download Subscription Document
                </Button>
              </Box>

              {editMode ? (
                <Uploader
                  onUploadSuccess={(doc: Document) =>
                    setSubscriptionDocument(doc)
                  }
                />
              ) : (
                <Box mb={2}>
                  <Button
                    variant='contained'
                    component={Button}
                    fullWidth
                    disabled={false}
                    onClick={() => {
                      onClickDownload(
                        `/issuance/commitment/dataroom/subscription/signed/raw/${commitment._id}`
                      )
                    }}
                  >
                    Download Signed Subscription Document
                  </Button>
                </Box>
              )}

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
                      symbol: commitment.currency.numberFormat.currency
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
                      symbol: commitment.currency.numberFormat.currency
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
                      disabled={saving || commitment.status !== 'Unauthorized'}
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
