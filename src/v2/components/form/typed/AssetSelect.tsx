import React, { useMemo, ComponentProps } from 'react'
import { useTypedSelect } from 'v2/components/form/typed/Select'
import { AssetType } from 'v2/context/assets/types'
import { useAssetsData } from 'v2/context/assets/useAssetsData'
import { MenuItem } from '@material-ui/core'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAssetSelect = <FormType,>(type: AssetType) => {
  const TypedSelect = useTypedSelect<FormType>()
  const { status, data } = useAssetsData(type)

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
            {type}
          </MenuItem>
          {data.list.map(({ _id, numberFormat }) => (
            <MenuItem key={_id} value={_id}>
              {numberFormat.currency}
            </MenuItem>
          ))}
        </TypedSelect>
      )
    },
    // eslint-disable-next-line
    [data, type, status]
  )
}
