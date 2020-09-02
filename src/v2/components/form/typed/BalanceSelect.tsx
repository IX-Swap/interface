import React, { useMemo, ComponentProps } from 'react'
import { useTypedSelect } from 'v2/components/form/typed/Select'
import { MenuItem } from '@material-ui/core'
import { useAllBalances } from 'v2/context/balances/useAllBalances'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useBalanceSelect = <FormType,>() => {
  const TypedSelect = useTypedSelect<FormType>()
  const { status, data } = useAllBalances()

  return useMemo(
    () => (props: ComponentProps<typeof TypedSelect>): JSX.Element => {
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
            Balance
          </MenuItem>
          {data.list.map(({ _id, symbol, name }) => (
            <MenuItem key={_id} value={_id}>
              {name} ({symbol})
            </MenuItem>
          ))}
        </TypedSelect>
      )
    },
    [data, status]
  )
}
