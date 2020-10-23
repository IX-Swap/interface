import React, {
  ComponentProps,
  JSXElementConstructor,
  PropsWithChildren,
  useMemo
} from 'react'
import {
  DeepPath,
  DeepPathValue,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { Form, FormProps } from 'v2/components/form/Form'
import { createTypedField } from 'v2/components/form/createTypedField'
import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  Input,
  OutlinedInput,
  SelectProps,
  TextFieldProps
} from '@material-ui/core'
import { AssetSelect, AssetSelectProps } from 'v2/components/form/AssetSelect'
import { CorporateSelect } from 'v2/components/form/CorporateSelect'
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
import { useFieldArray, useFormContext } from 'react-hook-form'
import { pathToString } from 'v2/components/form/utils'
import { YesOrNo } from 'v2/components/form/YesOrNo'
import {
  DataroomDocument,
  DataroomDocumentProps
} from 'v2/components/form/DataroomDocument'
import { RichTextEditor } from './RichTextEditor'
import { Maybe } from 'v2/types/util'
import { DistributionFrequencySelect } from 'v2/components/form/DistributionFrequencySelect'
import { DataroomFileTypeSelect } from './DataroomFileTypeSelect'
import { LabelledValue } from '../LabelledValue'
import { DatePicker } from 'v2/components/form/DatePicker'

export const booleanValueExtractor = (
  _: React.ChangeEvent<{}>,
  value: boolean
): boolean => value

export const numericValueExtractor = (
  values: NumberFormatValues
): number | undefined => values.floatValue

export const plainValueExtractor = (value: any) => value

export const dateTimeValueExtractor = (value: Date, stringValue: string) => {
  return value
}

export interface FieldsArrayRendererProps {
  fields: any[]
  append: (field: any) => void
  remove: (index: number) => void
}

// TODO: optimize performance
export const createTypedForm = <FormType extends Record<string, any>>() => {
  const TypedField = createTypedField<FormType>()

  const FormComponent = ({
    children,
    ...props
  }: PropsWithChildren<FormProps<FormType>>): JSX.Element => (
    <Form {...props}>{children}</Form>
  )

  interface FieldsArrayComponentProps {
    name: string
    children: (props: FieldsArrayRendererProps) => Maybe<JSX.Element>
  }

  const FieldsArrayComponent = <Path extends DeepPath<FormType, Path>>(
    props: FieldsArrayComponentProps
  ) => {
    const { name, children } = props
    const { control } = useFormContext()
    const fieldArray = useFieldArray({ name, control })

    return children(fieldArray)
  }

  const TextFieldComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<
      TypedFieldProps<FormType, DeepPath<FormType, Path>>,
      'children'
    > &
      Omit<TextFieldProps, 'name'>
  ): JSX.Element => (
    <TypedField {...props}>
      {props.variant === 'outlined' ? <OutlinedInput /> : <Input />}
    </TypedField>
  )

  const DatePickerComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField
      {...(props as any)}
      valueExtractor={(value, stringValue) => {
        return value
      }}
    >
      {fieldProps => <DatePicker {...(fieldProps as any)} />}
    </TypedField>
  )

  const RichTextEditorComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props} valueExtractor={value => value}>
      {fieldProps => <RichTextEditor {...fieldProps} label={props.label} />}
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
      {fieldProps => {
        return (
          <FormControlLabel
            {...fieldProps}
            label={props.label}
            control={
              <MUICheckbox color='primary' defaultChecked={fieldProps.value} />
            }
          />
        )
      }}
    </TypedField>
  )

  const DataroomDocumentComponent = <Path extends DeepPath<FormType, Path>>({
    documentInfo,
    deleteComponent,
    uploadComponent,
    onDelete,
    canDelete,
    setValueToNullOnDelete,
    ...props
  }: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'> &
    DataroomDocumentProps): JSX.Element => (
    <TypedField
      {...props}
      valueExtractor={props.valueExtractor ?? plainValueExtractor}
    >
      {fieldProps => (
        <DataroomDocument
          {...fieldProps}
          name={pathToString(props.name, props.root)}
          documentInfo={documentInfo}
          onChange={fieldProps.onChange}
          onDelete={onDelete}
          uploadComponent={uploadComponent}
          deleteComponent={deleteComponent}
          canDelete={canDelete}
          setValueToNullOnDelete={setValueToNullOnDelete}
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

  const CorporateSelectComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <CorporateSelect />
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

  const DataroomFileTypeSelectComponent = <
    Path extends DeepPath<FormType, Path>
  >(
    props: SelectProps &
      Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <DataroomFileTypeSelect />
    </TypedField>
  )

  const DistributionFrequencySelectComponent = <
    Path extends DeepPath<FormType, Path>
  >(
    props: Omit<TypedFieldProps<FormType, DeepPath<FormType, Path>>, 'children'>
  ): JSX.Element => (
    <TypedField {...props}>
      <DistributionFrequencySelect />
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

  interface EditableFieldWithCustomRendererProps {
    viewRenderer?: JSX.Element
    editRenderer?: (input: JSX.Element) => JSX.Element
  }

  const ViewComponent = <Path extends DeepPath<FormType, Path>>(
    props: Omit<
      TypedFieldProps<FormType, DeepPath<FormType, Path>>,
      'children'
    > &
      EditableFieldWithCustomRendererProps
  ): JSX.Element => {
    const { watch } = useFormContext()
    const value = watch(pathToString(props.name, props.root))

    if (props.viewRenderer !== undefined) {
      return props.viewRenderer
    }

    return <LabelledValue label={props.label} value={value} />
  }

  return () => {
    const fields = useMemo(
      () => ({
        TextField: TextFieldComponent,
        NumericField: NumericFieldComponent,
        AssetSelect: AssetSelectComponent,
        BalanceSelect: BalanceSelectComponent,
        BankSelect: BankSelectComponent,
        CountrySelect: CountrySelectComponent,
        DistributionFrequency: DistributionFrequencySelectComponent,
        NationalitySelect: NationalitySelectComponent,
        GenderSelect: GenderSelectComponent,
        MartialStatusSelect: MartialStatusSelectComponent,
        Checkbox: CheckboxComponent,
        YesOrNo: YesOrNoComponent,
        DataroomDocument: DataroomDocumentComponent,
        CorporateSelect: CorporateSelectComponent,
        RichTextEditor: RichTextEditorComponent,
        DataroomFileTypeSelect: DataroomFileTypeSelectComponent,
        DatePicker: DatePickerComponent
      }),
      []
    )

    type Fields = typeof fields
    type FieldTypes = keyof Fields
    type FieldProps<FieldType extends keyof Fields> = Fields[FieldType] extends
      | keyof JSX.IntrinsicElements
      | JSXElementConstructor<any>
      ? ComponentProps<Fields[FieldType]>
      : never

    interface EditableFieldProps<FieldType> {
      fieldType: FieldType
      isEditing: boolean
    }

    const EditableField = <FieldType extends FieldTypes>(
      props: EditableFieldProps<FieldType> &
        FieldProps<FieldType> &
        EditableFieldWithCustomRendererProps
    ): JSX.Element => {
      const { fieldType, isEditing, editRenderer, ...fieldProps } = props
      let component: any

      if (props.isEditing) {
        component = fields[fieldType]

        if (editRenderer !== undefined) {
          return editRenderer(React.createElement(component, fieldProps))
        }
      } else {
        component = ViewComponent
      }

      return React.createElement(component, fieldProps)
    }

    const FormValueComponent = <Path extends DeepPath<FormType, Path>>(props: {
      name: Path
      root?: string
      children: (
        value: UnpackNestedValue<DeepPathValue<FormType, Path>>
      ) => Maybe<JSX.Element>
    }): Maybe<JSX.Element> => {
      const { name, root, children } = props
      const { watch } = useFormContext()
      const value = watch(pathToString(name, root))

      return children(value)
    }

    return useMemo(
      () => ({
        ...fields,
        Form: FormComponent,
        EditableField: EditableField,
        FormValue: FormValueComponent,
        FieldsArray: FieldsArrayComponent,
        Submit: Submit
      }),
      [] // eslint-disable-line
    )
  }
}
