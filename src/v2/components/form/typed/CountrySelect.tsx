import React from 'react'
import { useTypedSelect } from 'v2/components/form/typed/Select'
import { MenuItem } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { COUNTRIES_OPTS } from 'v2/app/components/identity-forms/const'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCountrySelect = <FormType,>() => {
  const TypedSelect = useTypedSelect<FormType>()

  // @ts-expect-error
  return props => (
    <TypedSelect {...props}>
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenu(COUNTRIES_OPTS)}
    </TypedSelect>
  )
}
