import { Control, useFormContext, FieldError } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import { FormControl, InputLabel, SelectProps } from '@material-ui/core'
import React from 'react'
import {
  DeepPath,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import get from 'lodash/get'
import { TypedFormFieldProps } from 'v2/components/form/typed/types'
import { pathToString } from 'v2/components/form/typed/utils'
import { AssetsSelect } from 'v2/components/form/AssetsSelect'
import FormHelperText from '@material-ui/core/FormHelperText'
import { AssetType } from 'v2/context/assets/types'

type AssetSelectProps = Omit<SelectProps, 'name'> & {
  assetType: AssetType
}

export const createTypedAssetSelect = <
  FormType extends Record<string, any>
>() => <Path extends DeepPath<FormType, Path>>(
  props: TypedFormFieldProps<FormType, Path> & AssetSelectProps
) => <AssetSelect {...props} />

export const AssetSelect = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> & AssetSelectProps
): JSX.Element => {
  const {
    name,
    defaultValue,
    assetType,
    fullWidth = true,
    ...selectProps
  } = props
  const { control, errors, formState, setValue, trigger } = useFormContext<
    FormType
  >()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(props.name)
  const error = get(errors, path) as FieldError
  const hasError = get(formState.touched, path) === true && Boolean(error)
  const handleChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setValue(path, e.target.value as any)
    // eslint-disable-next-line no-void
    void trigger()
  }

  return (
    <TypedController
      name={name}
      defaultValue={defaultValue}
      render={controllerProps => (
        <FormControl fullWidth={fullWidth}>
          <InputLabel error={hasError}>Assets</InputLabel>
          <AssetsSelect
            {...controllerProps}
            {...selectProps}
            type={assetType}
            error={hasError}
            onChange={handleChange}
          />
          {hasError && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
