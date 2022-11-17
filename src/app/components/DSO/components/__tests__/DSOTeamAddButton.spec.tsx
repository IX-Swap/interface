import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render } from 'test-utils'
import {
  DSOChapterAddButton,
  DSOTeamAddButtonProps
} from 'app/components/DSO/components/DSOChapterAddButton'

describe('DSOTeamAddButton', () => {
  const props: DSOTeamAddButtonProps = {
    append: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes append function with index on button click', async () => {
    const { getByRole } = render(<DSOChapterAddButton {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.append).toHaveBeenCalledTimes(1)
    })
  })
})
