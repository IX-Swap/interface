import {
  PersonnelList,
  titleText
} from 'app/pages/identity/components/CorporateIdentityView/PersonnelList'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { CompanyPersonnel } from 'app/pages/identity/components/CorporateIdentityView/CompanyPersonnel'

jest.mock(
  'app/pages/identity/components/CorporateIdentityView/CompanyPersonnel',
  () => ({
    CompanyPersonnel: jest.fn(() => null)
  })
)

describe('PersonnelList', () => {
  const personnels = corporate.representatives
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns null when personnels length < 1', () => {
    const { container } = render(<PersonnelList personnel={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders components correctly', () => {
    render(<PersonnelList personnel={personnels} />)

    expect(CompanyPersonnel).toHaveBeenNthCalledWith(
      1,
      {
        personnel: personnels[0],

        title: titleText
      },
      {}
    )
  })
})
