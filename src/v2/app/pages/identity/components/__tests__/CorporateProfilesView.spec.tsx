/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateProfilesView,
  CorporateProfilesViewProps
} from 'v2/app/pages/identity/components/CorporateProfilesView'
import { individual } from '__fixtures__/identity'
import { user } from '__fixtures__/user'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'

jest.mock('v2/app/pages/identity/components/IndividualInfoView', () => ({
  IndividualInfoView: jest.fn(() => null)
}))

describe('CorporateProfilesView', () => {
  const props: CorporateProfilesViewProps = { data: [individual], user: user }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateProfilesView {...props} />)
  })

  it('renders IndividualInfoView with correct props', () => {
    render(<CorporateProfilesView {...props} />)

    expect(IndividualInfoView).toHaveBeenCalledWith({ data: individual }, {})
  })
})
