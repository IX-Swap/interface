/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualInfoView,
  IndividualInfoViewProps
} from 'v2/app/pages/identity/components/IndividualInfoView'
import { individual } from '__fixtures__/identity'
import { user } from '__fixtures__/user'
import { Avatar } from 'v2/components/Avatar'

jest.mock('v2/components/Avatar', () => ({ Avatar: jest.fn(() => null) }))

describe('IndividualInfoView', () => {
  const props: IndividualInfoViewProps = { data: { ...individual, user: user } }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualInfoView {...props} />)
  })

  it('renders Avatar with correct props', () => {
    render(<IndividualInfoView {...props} />)

    expect(Avatar).toHaveBeenCalledTimes(1)
    expect(Avatar).toHaveBeenCalledWith(
      {
        documentId: props.data.photo,
        ownerId: props.data.user._id
      },
      {}
    )
  })
})
