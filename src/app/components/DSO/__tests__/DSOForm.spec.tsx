import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOForm, DSOFormProps } from 'app/components/DSO/DSOForm'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router'
import * as useParsedDataHook from 'hooks/useParsedData'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

jest.mock('app/components/DSO/components/DSOBaseFields', () => ({
  DSOBaseFields: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOPricing', () => ({
  DSOPricing: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOTerms', () => ({
  DSOTerms: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOTeam', () => ({
  DSOTeam: jest.fn(() => <div />)
}))

describe('DSOForm', () => {
  const props: DSOFormProps = {
    isEditing: false,
    isNew: false,
    data: dso
  }

  const parsedDataFn = jest.fn()

  beforeEach(() => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })

    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOForm {...props} />)
  })

  it('renders form field components', () => {
    render(<DSOForm {...props} />)
    expect(DSOBaseFields).toHaveBeenCalled()
    expect(DSOPricing).toHaveBeenCalled()
    expect(DSOTerms).toHaveBeenCalled()
    expect(DSOTeam).toHaveBeenCalled()
  })
})
