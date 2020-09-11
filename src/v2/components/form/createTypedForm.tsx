import React, {
  ComponentProps,
  JSXElementConstructor,
  PropsWithChildren,
  useMemo
} from 'react'
import { DeepPath } from '@hookform/strictly-typed/dist/types'
import { Form, FormProps } from 'v2/components/form/Form'
import { createTypedField } from 'v2/components/form/createTypedField'
import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  Grid,
  Input,
  Typography
} from '@material-ui/core'
import { AssetSelect, AssetSelectProps } from 'v2/components/form/AssetSelect'
import { Submit } from 'v2/components/form/Submit'
import { BalanceSelect } from 'v2/components/form/BalanceSelect'
import { BankSelect } from 'v2/components/form/BankSelect'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import {
  NumericInput,
  NumericInputProps
} from 'v2/components/form/NumericField'
import { NumberFormatValues } from 'react-number-format'
import { TypedFieldProps } from 'v2/components/form/types'
import { NationalitySelect } from 'v2/components/form/NationalitySelect'
import { GenderSelect } from 'v2/components/form/GenderSelect'
import { MartialStatusSelect } from 'v2/components/form/MartialStatusSelect'
import { useFormContext } from 'react-hook-form'
import { pathToString } from 'v2/components/form/utils'
import { YesOrNo } from 'v2/components/form/YesOrNo'

const booleanValueExtractor = (
  _: React.ChangeEvent<{}>,
  value: boolean
): boolean => value

const numericValueExtractor = (
  values: NumberFormatValues
): number | undefined => values.floatValue

const formatValue = (value: any): string => {
  const empty = '–'

  if (value === undefined || value === null) {
    return empty
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (typeof value === 'string' && value.length === 0) {
    return empty
  }

  return value
}

export const createTypedForm = <FormType extends Record<string, any>>() => {
  const TypedField = createTypedField<FormType>()

  const FormComponent = ({
    children,
    ...props
  }: PropsWithChildren<FormProps<FormType>>): JSX.Element => (
    <Form {...props}>{children}</Form>
  )

  const TextFieldComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <Input />
    </TypedField>
  )

  const NumericFieldComponent = <Path extends DeepPath<FormType, Path>>({
    numberFormat,
    ...rest
  }: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'> &
    NumericInputProps): JSX.Element => (
    <TypedField {...rest} valueExtractor={numericValueExtractor}>
      <NumericInput numberFormat={numberFormat} />
    </TypedField>
  )

  const CheckboxComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props} valueExtractor={booleanValueExtractor}>
      {fieldProps => (
        <FormControlLabel
          {...fieldProps}
          label={props.label}
          control={<MUICheckbox />}
        />
      )}
    </TypedField>
  )

  const YesOrNoComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      {fieldProps => (
        <YesOrNo {...fieldProps} name={pathToString(props.name)} />
      )}
    </TypedField>
  )

  const AssetSelectComponent = <Path extends DeepPath<FormType, Path>>({
    assetType,
    ...props
  }: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'> &
    AssetSelectProps): JSX.Element => (
    <TypedField {...props}>
      <AssetSelect assetType={assetType} />
    </TypedField>
  )

  const BalanceSelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <BalanceSelect />
    </TypedField>
  )

  const BankSelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <BankSelect />
    </TypedField>
  )

  const CountrySelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <CountrySelect />
    </TypedField>
  )

  const NationalitySelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <NationalitySelect />
    </TypedField>
  )

  const GenderSelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <GenderSelect />
    </TypedField>
  )

  const MartialStatusSelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <MartialStatusSelect />
    </TypedField>
  )

  const ViewComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => {
    const { watch } = useFormContext()
    const value = watch(pathToString(props.name))

    return (
      <Grid item>
        <Typography style={{ fontWeight: 600 }}>{props.label}</Typography>
        <Typography>{formatValue(value)}</Typography>
      </Grid>
    )
  }

  const fields = {
    TextField: TextFieldComponent,
    NumericField: NumericFieldComponent,
    AssetSelect: AssetSelectComponent,
    BalanceSelect: BalanceSelectComponent,
    BankSelect: BankSelectComponent,
    CountrySelect: CountrySelectComponent,
    NationalitySelect: NationalitySelectComponent,
    GenderSelect: GenderSelectComponent,
    MartialStatusSelect: MartialStatusSelectComponent,
    Checkbox: CheckboxComponent,
    YesOrNo: YesOrNoComponent
  }

  type Fields = typeof fields
  type FieldTypes = keyof Fields
  type FieldProps<FieldType extends keyof Fields> = Fields[FieldType] extends
    | keyof JSX.IntrinsicElements
    | JSXElementConstructor<any>
    ? ComponentProps<Fields[FieldType]>
    : never

  const EditableField = <FieldType extends FieldTypes>(
    props: {
      fieldType: FieldType
      isEditing: boolean
    } & FieldProps<FieldType>
  ): JSX.Element => {
    const { fieldType, isEditing, ...fieldProps } = props
    let component: any

    if (props.isEditing) {
      component = fields[fieldType]
    } else {
      component = ViewComponent
    }

    console.log('re-rendered')
    return React.createElement(component, fieldProps)
  }

  return () => {
    return useMemo(
      () => ({
        ...fields,
        Form: React.memo(FormComponent),
        EditableField: EditableField,
        Submit: Submit
      }),
      []
    )
  }
}
