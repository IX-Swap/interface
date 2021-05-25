import React from 'react'
import { render, cleanup } from 'test-utils'

import { corporate } from '__fixtures__/identity'
import { Avatar } from 'components/Avatar'
import {
  CompanyInfoView,
  CompanyInfoViewProps
} from 'app/pages/identity/components/CompanyInfoView/CompanyInfoView'

jest.mock('__tests__/Avatar', () => ({ Avatar: jest.fn(() => null) }))

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
