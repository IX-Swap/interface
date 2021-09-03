import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOChapterAddButton,
  DSOTeamAddButtonProps
} from 'app/components/DSO/components/DSOChapterAddButton'

describe('DSOTeamAddButton', () => {
  const props: DSOTeamAddButtonProps = {
    append: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOChapterAddButton {...props} />)
  })

  it('invokes append function with index on button click', async () => {
    const { getByRole } = render(<DSOChapterAddButton {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.append).toHaveBeenCalledTimes(1)
    })
  })
})
