/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdEdit } from 'v2/app/pages/identity/pages/individual/IndividualIdEdit'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import { PageTitle } from 'v2/app/components/PageTitle'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'

jest.mock('v2/app/components/PageTitle', () => ({
  PageTitle: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/IndividualIdentityForm', () => ({
  IndividualIdentityForm: jest.fn(() => null)
}))

describe('IndividualIdEdit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdEdit />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<IndividualIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: undefined }))
    const { container } = render(<IndividualIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders IndividualIdentityForm with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    render(<IndividualIdEdit />)

    expect(IndividualIdentityForm).toHaveBeenCalledTimes(1)
    expect(IndividualIdentityForm).toHaveBeenNthCalledWith(
      1,
      {
        data: individual,
        isEditing: true,
        useOwnEmail: false,
        submitButtonText: 'Save',
        cancelButton: expect.anything()
      },
      {}
    )
  })

  it('renders PageTitle with correct props', () => {
    render(<IndividualIdEdit />)

    expect(PageTitle).toHaveBeenCalledTimes(1)
    expect(PageTitle).toHaveBeenNthCalledWith(
      1,
      {
        subPage: true,
        title: `${individual.firstName} ${individual.lastName}`
      },
      {}
    )
  })
})
