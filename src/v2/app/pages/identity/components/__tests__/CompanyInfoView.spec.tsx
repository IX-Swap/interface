import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CompanyInfoView,
  CompanyInfoViewProps
} from 'v2/app/pages/identity/components/CompanyInfoView'
import { corporate } from '__fixtures__/identity'
import { Avatar } from 'v2/components/Avatar'

jest.mock('v2/components/Avatar', () => ({ Avatar: jest.fn(() => null) }))

describe('CompanyInfoView', () => {
  const props: CompanyInfoViewProps = { data: corporate }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CompanyInfoView {...props} />)
  })

  it('renders Avatar with correct props', () => {
    render(<CompanyInfoView {...props} />)

    expect(Avatar).toHaveBeenCalledTimes(1)
    expect(Avatar).toHaveBeenCalledWith(
      {
        documentId: props.data.logo,
        ownerId: props.data.user._id
      },
      {}
    )
  })
})
