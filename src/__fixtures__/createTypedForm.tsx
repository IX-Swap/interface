export const useTypedForm = (): any =>
  ({
    TextField: jest.fn(() => null),
    NumericField: jest.fn(() => null),
    AssetSelect: jest.fn(() => null),
    BankSelect: jest.fn(() => null),
    CountrySelect: jest.fn(() => null),
    NationalitySelect: jest.fn(() => null),
    GenderSelect: jest.fn(() => null),
    MartialStatusSelect: jest.fn(() => null),
    Checkbox: jest.fn(() => null),
    YesOrNo: jest.fn(() => null),
    DataroomDocument: jest.fn(() => null),
    Form: jest.fn(() => null),
    TypedField: jest.fn(() => null),
    FormValue: jest.fn(() => null),
    Submit: jest.fn(() => null)
  } as any)

// eslint-disable-next-line react-hooks/rules-of-hooks
export const generateCreateTypedFormResult = () => useTypedForm()
