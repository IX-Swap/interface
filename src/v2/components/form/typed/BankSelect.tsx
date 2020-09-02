import React, { useMemo, ComponentPropsWithRef } from 'react'
import { useTypedSelect } from 'v2/components/form/typed/Select'
import { MenuItem } from '@material-ui/core'
import { useBanks } from 'v2/app/pages/accounts/pages/banks/hooks/useBanks'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useBankSelect = <FormType,>() => {
  const TypedSelect = useTypedSelect<FormType>()
  const { status, data } = useBanks()

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
    [data, status]
  )
}
