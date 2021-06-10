import { useSelectionHelperContext } from 'components/SelectionHelper'
import { useEffect } from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export const useResetSelectionOnUnmount = () => {
  const { resetSelection } = useSelectionHelperContext<VirtualAccount>()

  useEffect(() => {
    return () => {
      resetSelection()
    }
    // eslint-disable-next-line
  }, [])
}
