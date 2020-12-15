import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  MarkAsRead,
  MarkAsReadProps
} from 'app/pages/notifications/components/MarkAsRead'
import { fireEvent, waitFor } from '@testing-library/react'
import { notification } from '__fixtures__/notification'
import * as useMarkAsReadHook from 'app/pages/notifications/hooks/useMarkAsRead'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('MarkAsRead', () => {
  const props: MarkAsReadProps = {
    data: notification
  }
  const mutation = jest.fn()

  beforeAll(() => {
    jest.spyOn(useMarkAsReadHook, 'useMarkAsRead').mockReturnValue({
      ...generateMutationResult({}),
      mutation
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MarkAsRead {...props} />)
  })

  it('invokes useMarkAsRead mutation fn when button is clicked', async () => {
    const { getByRole } = render(<MarkAsRead {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(mutation).toHaveBeenCalledTimes(1)
    })
  })
})
