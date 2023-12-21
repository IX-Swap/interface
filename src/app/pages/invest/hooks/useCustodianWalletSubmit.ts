import {
  // useState,
  useCallback
} from 'react'
import { PlaceOrderArgs } from 'app/pages/invest/types/form'
// import { useAuth } from 'hooks/auth/useAuth'
// import { getIdFromObj } from 'helpers/strings'
// import { useExistsCustodianWallet } from 'app/pages/invest/hooks/useExistsCustodianWallet'
import { useCreateOrder } from 'app/pages/invest/hooks/useCreateOrder'

export const useCustodianWalletSubmit = () => {
  //   const { user } = useAuth()
  //   const [openDialog, setOpenDialog] = useState<boolean>(false)
  //   const [form, setForm] = useState<PlaceOrderArgs>()
  const [placeOrder, { status: createOrderStatus }] = useCreateOrder()
  //   const [checkExistsCustodianWallet, { status: existCustodianWalletStatus }] =
  //     useExistsCustodianWallet({
  //       userId: getIdFromObj(user),
  //       onSuccess: async ({ response }) => {
  //         if (response === null) {
  //           setOpenDialog(true)
  //         } else {
  //           await placeOrder(form)
  //         }
  //       },
  //       onError: () => {
  //         setOpenDialog(true)
  //       }
  //     })
  const submitForm = useCallback(
    async (args: PlaceOrderArgs) => {
      //   setForm(args)
      //   await checkExistsCustodianWallet()
      await placeOrder(args)
    },
    // [checkExistsCustodianWallet]
    [placeOrder]
  )
  return {
    // openDialog,
    // setOpenDialog,
    isFetching: createOrderStatus === 'loading',
    //   createOrderStatus === 'loading' ||
    //   existCustodianWalletStatus === 'loading',
    createOrderStatus: createOrderStatus,
    submitForm
  }
}
