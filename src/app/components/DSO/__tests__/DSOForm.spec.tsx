import React from 'react'
import { render } from 'test-utils'
import { DSOForm, DSOFormProps } from 'app/components/DSO/DSOForm'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import * as useParsedDataHook from 'hooks/useParsedData'
import * as useSetPageTitle from 'app/hooks/useSetPageTitle'

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
    isNew: false,
    data: dso
  }

  const parsedDataFn = jest.fn()
  const pageTitleFn = jest.fn()

  beforeEach(() => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })

    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)

    jest
      .spyOn(useSetPageTitle, 'useSetPageTitle')
      .mockImplementation(pageTitleFn)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders form field components', () => {
    render(<DSOForm {...props} />)
  })
})
