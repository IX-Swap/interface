import React, { useState, useEffect } from 'react'
import { useStore } from '../../store'
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core'
import { FormContext, useForm } from 'react-hook-form'
import DepositList from './list'
import DepositForm from './form'
import { noop } from 'lodash'

import BankDetails from '../../../../../../components/bank-details'
import { INVESTAX_BANK } from '../../../../../../../../config'
import { generateRandom, formatMoney } from '../../../../../../../../helpers/numbers'
import GenericPreview from '../../../../../../components/generic-preview'
import { useStore as useAssetsStore } from '../../../../../../../../context/assets'
import { LabelValue } from '../../../../../../../../types/util'
import { useObserver } from 'mobx-react'

const DepositListMemoed = React.memo(DepositList)

const ConfirmationView = ({
  previewData
}: {
  previewData: Array<{ label: string; value: string }>
}) => {
  return (
    <>
      <Box p={2}>
        <Typography variant='subtitle1' align='center'>
          <b>Are you sure you want to continue with this transaction?</b>
        </Typography>
      </Box>
      <GenericPreview items={previewData} />
    </>
  )
}

const ConfirmationButtons = ({
  data,
  handleBackButton
}: {
  data: { amount: string; asset: string }
  handleBackButton: () => void
}) => {
  const [, setTwoFa] = useState('')
  const assetsStore = useAssetsStore()
  const assetObject = assetsStore.currencies.find(
    (e) => e._id === data.asset
  ) ?? { numberFormat: { currency: 'SGD' } }
  const money = formatMoney(
    parseFloat(data.amount ?? '0'),
    assetObject.numberFormat.currency
  )
  const saving = false

  useEffect(() => {
    assetsStore.getCurrencies().then(noop).catch(noop)
  }, [assetsStore])

  const handle2faChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwoFa(e.target.value)
  }

  return useObserver(() => (
    <Grid item container direction='column'>
      <Typography variant='caption' align='center'>
        You will be transferring {money}
        in the above-mentioned bank account. Use the transfer code in the <br />{' '}
        transfer remarks field. Please confirm your bank account before
        proceeding.
      </Typography>

      <Box my={4} alignSelf='center'>
        <TextField
          id='two-fa'
          label='2-Factor Auth Code'
          variant='outlined'
          autoComplete='off'
          onChange={handle2faChange}
        />
      </Box>

      <Grid container justify='center'>
        <Box component='div' mr={2} display='inline'>
          <Button color='default' onClick={handleBackButton}>
            Cancel
          </Button>
        </Box>
        <Box mb={4}>
          <Button
            disableElevation
            disabled={!data.amount || saving}
            variant='contained'
            color='primary'
          >
            Confirm Deposit
          </Button>
        </Box>
      </Grid>
    </Grid>
  ))
}

const BankDeposit = ({ code }: {code: string}) => {
  const [isPreview, setIsPreview] = useState(false)
  const [previewData, setPreviewData] = useState<LabelValue[]>([])
  const assetsStore = useAssetsStore()
  const methods = useForm({ defaultValues: { asset: '', amount: '' } })
  const deposit = async () => {
    const isValid = await methods.triggerValidation()
    if (isValid) {
      const values = methods.getValues()
      const assetObject = assetsStore.currencies.find(
        (e) => e._id === values.asset
      ) ?? { numberFormat: { currency: 'SGD' } }
      const money = formatMoney(
        parseFloat(values.amount ?? '0'),
        assetObject.numberFormat.currency
      )
      setPreviewData([
        {
          label: 'Deposit Code',
          value: code
        },
        {
          label: 'Account Number',
          value: INVESTAX_BANK.bankAccountNumber ?? ''
        },
        {
          label: 'Deposit Amount',
          value: money
        }
      ])
    }
    setIsPreview(isValid)
  }

  return (
    <FormContext {...methods}>
      <Grid container direction='column' spacing={4}>
        <Grid item style={{ paddingBottom: '0px' }}>
          {!isPreview ? (
            <DepositForm />
          ) : (
            <ConfirmationView previewData={previewData} />
          )}
        </Grid>
        <Grid item>
          <Box mx={4}>
            <BankDetails bank={INVESTAX_BANK} code={code} />
          </Box>
        </Grid>
        <Grid item container justify='center'>
          {!isPreview ? (
            <Button
              disableElevation
              variant='contained'
              color='primary'
              onClick={() => {
                deposit().then(noop).catch(noop)
              }}
            >
              Deposit
            </Button>
          ) : (
            <ConfirmationButtons
              data={methods.getValues()}
              handleBackButton={() => setIsPreview(false)}
            />
          )}
        </Grid>
        <Grid item>
          <Box px={4}>
            <Typography variant='h3'>Recent Deposits</Typography>
            <DepositListMemoed />
          </Box>
        </Grid>
      </Grid>
    </FormContext>
  )
}

const BankDepositWrapper = () => {
  const store = useStore()
  const code = generateRandom(8, 'A#')
  store.setTitle('Deposit to InvestaX')

  return <BankDeposit code={code} />
}

export default BankDepositWrapper
