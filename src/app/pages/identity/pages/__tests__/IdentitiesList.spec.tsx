import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview'
import { CorporatePreview } from 'app/pages/identity/components/CorporatePreview'
import { IdentityRoot } from 'app/pages/identity/pages/IdentitiesList'
import * as individualIdentityHook from 'hooks/identity/useIndividualIdentity'
import * as allCorporateIdentitiesHook from 'hooks/identity/useAllCorporateIdentities'
import { individual, corporate } from '__fixtures__/identity'
import {
  generateQueryResult,
  generateInfiniteQueryResult
} from '__fixtures__/useQuery'
import { IdentityDialog } from 'app/pages/identity/components/IdentityDialog'

jest.mock('app/pages/identity/components/IdentityDialog', () => ({
  IdentityDialog: jest.fn(() => null)
}))
jest.mock('app/pages/identity/components/IndividualPreview', () => ({
  IndividualPreview: jest.fn(() => null)
}))
jest.mock('app/pages/identity/components/CorporatePreview', () => ({
  CorporatePreview: jest.fn(() => null)
}))

describe('IdentitiesRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)
  })

  it('renders IndividualIdPreview & CorporatePreview', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)

    expect(IndividualPreview).toHaveBeenCalledTimes(1)
    expect(CorporatePreview).toHaveBeenCalledTimes(1)
  })

  it('renders IdentityDialog with correct props identities exist', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)

    expect(IdentityDialog).toHaveBeenCalledWith(
      {
        closeFn: expect.any(Function),
        isOpen: false
      },
      {}
    )
  })

  it('renders IdentityDialog with correct props identities does not exist', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({}))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({}))
    render(<IdentityRoot />)

    expect(IdentityDialog).toHaveBeenCalledWith(
      {
        closeFn: expect.any(Function),
        isOpen: false
      },
      {}
    )
  })
})
