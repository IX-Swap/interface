import { createTypedForm } from 'v2/components/form/createTypedForm'

export const useTypedForm = (): ReturnType<ReturnType<typeof createTypedForm>> => ({
    TextField: jest.fn(() => null),
    NumericField: jest.fn(() => null),
    AssetSelect: jest.fn(() => null),
    BalanceSelect: jest.fn(() => null),
    BankSelect: jest.fn(() => null),
    CountrySelect: jest.fn(() => null),
    NationalitySelect: jest.fn(() => null),
    GenderSelect: jest.fn(() => null),
    MartialStatusSelect: jest.fn(() => null),
    Checkbox: jest.fn(() => null),
    YesOrNo: jest.fn(() => null),
    DataroomDocument: jest.fn(() => null),
    Form: jest.fn(() => null),
    EditableField: jest.fn(() => null),
    FormValue: jest.fn(() => null),
    Submit: jest.fn(() => null)
} as any)


export const generateCreateTypedFormResult = () => useTypedForm()
