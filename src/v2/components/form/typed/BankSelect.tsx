import React, { useMemo, ComponentPropsWithRef } from 'react'
import { useTypedSelect } from 'v2/components/form/typed/Select'
import { MenuItem } from '@material-ui/core'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useBankSelect = <FormType,>() => {
  const TypedSelect = useTypedSelect<FormType>()

  const { data, status } = useBanksData()

  return useMemo(
    () => (props: ComponentPropsWithRef<typeof TypedSelect>): JSX.Element => {
      if (status === 'loading') {
        return <div>loading...</div>
      }

      if (status === 'error') {
        return <div>error...</div>
      }

      return (
        // @ts-expect-error
        <TypedSelect {...props}>
          <MenuItem disabled value={undefined}>
            Bank
          </MenuItem>
          {data.list.map(({ _id, bankName, bankAccountNumber }) => (
            <MenuItem key={_id} value={_id}>
              {bankName} – {bankAccountNumber}
            </MenuItem>
          ))}
        </TypedSelect>
      )
    },
    // eslint-disable-next-line
    [data, status]
  )
}
