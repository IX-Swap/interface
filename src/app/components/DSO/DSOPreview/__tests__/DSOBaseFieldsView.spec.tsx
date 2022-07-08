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
      { dsoId: dso._id, size: 124, variant: 'circular' },
      {}
    )
  })

  it('renders data correctly', () => {
    render(<DSOBaseFieldsView dso={dso} />)

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Token Name',
        value: dso?.tokenName,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Symbol',
        value: dso.tokenSymbol,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Corporate',
        value: dso.corporate.companyLegalName,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Network',
        value: dso.network?.name,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Capital Structure',
        value: dso.capitalStructure,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Decimal',
        value: dso.decimals,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Currency',
        value: dso.currency.symbol,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Launch Date',
        value: dso.launchDate,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Completion Date',
        value: dso.completionDate,
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
  })
})
