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

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Token Name',
        value: dso?.tokenName,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Symbol',
        value: dso.tokenSymbol,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Corporate',
        value: dso.corporate.companyLegalName,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Network',
        value: dso.network?.name,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Capital Structure',
        value: dso.capitalStructure,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      {
        label: 'Decimal',
        value: dso.decimalPlaces,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      7,
      {
        label: 'Currency',
        value: dso.currency.symbol,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      8,
      {
        label: 'Launch Date',
        value: dso.launchDate,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      9,
      {
        label: 'Completion Date',
        value: dso.completionDate,
        labelColor: 'default',
        isNewThemeOn: true,
        valueColor: 'rgb(255,255,255)'
      },
      {}
    )
  })
})
