import React from 'react'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { LabelledValue } from 'components/LabelledValue'

window.URL.revokeObjectURL = jest.fn()

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOBaseFieldsView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSLogo correctly', () => {
    render(<DSOBaseFieldsView dso={dso} />)

    expect(DSOLogo).toHaveBeenCalledWith(
      { dsoId: dso._id, size: 128, variant: 'square' },
      {}
    )
  })

  it('renders data correctly', () => {
    const { getByText } = render(<DSOBaseFieldsView dso={dso} />)

    expect(getByText(/dso information/i)).toBeTruthy()
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Token Name', value: dso.tokenName },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Symbol', value: dso.tokenSymbol },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Corporate', value: dso.corporate.companyLegalName },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Network', value: dso.network?.name },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Capital Structure', value: dso.capitalStructure },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Decimal', value: dso.decimalPlaces },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Currency', value: dso.currency.symbol },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Launch Date', value: dso.launchDate },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Completion Date', value: dso.completionDate },
      {}
    )
  })
})
