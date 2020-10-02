/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdView } from 'v2/app/pages/identity/pages/individual/IndividualIdView'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
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
jest.mock('v2/app/pages/identity/components/EditButton', () => ({
  EditButton: jest.fn(() => null)
}))

describe('IndividualIdView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<IndividualIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: undefined }))
    const { container } = render(<IndividualIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders IndividualIdentityForm with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    render(<IndividualIdView />)

    expect(IndividualIdentityForm).toHaveBeenCalledTimes(1)
    expect(IndividualIdentityForm).toHaveBeenCalledWith(
      {
        identity: individual,
        isEditing: false,
        cancelButton: expect.anything(),
        useOwnEmail: false
      },
      {}
    )
  })

  it('renders PageTitle with correct props', () => {
    render(<IndividualIdView />)

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

  it('renders EditButton with correct props', () => {
    render(<IndividualIdView />)

    expect(EditButton).toHaveBeenCalledTimes(1)
    expect(EditButton).toHaveBeenNthCalledWith(
      1,
      {
        link: IdentityRoute.editIndividual
      },
      {}
    )
  })
})
