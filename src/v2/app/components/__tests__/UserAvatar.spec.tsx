/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserAvatar, UserAvatarProps } from 'v2/app/components/UserAvatar'
import { user } from '__fixtures__/user'
import { Form } from 'v2/components/form/Form'

describe('UserAvatar', () => {
  const props: UserAvatarProps = {
    isEditing: true,
    name: user.name,
    ownerId: 'user123'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <UserAvatar {...props} />
      </Form>
    )
  })
})
