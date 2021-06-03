import { useState, useCallback } from 'react'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useExistsCustodianWallet } from 'app/pages/exchange/hooks/useExistsCustodianWallet'
import { useCreateOrder } from 'app/pages/exchange/hooks/useCreateOrder'

export const useCustodianWalletSubmit = () => {
  const { user } = useAuth()
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [form, setForm] = useState<PlaceOrderArgs>()
  const [placeOrder] = useCreateOrder()
  const [checkExistsCustodianWallet] = useExistsCustodianWallet({
    userId: getIdFromObj(user),
    onSuccess: async ({ response }) => {
      if (response === null) {
        setOpenDialog(true)
      } else {
        await placeOrder(form)
      }
    }
  })
  const submitForm = useCallback(
    async (args: PlaceOrderArgs) => {
      setForm(args)
      await checkExistsCustodianWallet()
    },
    [checkExistsCustodianWallet]
  )
  return { openDialog, setOpenDialog, submitForm }
}
