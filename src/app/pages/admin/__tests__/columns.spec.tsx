/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render } from 'test-utils'
import columns from 'app/pages/admin/columns'

describe('columns', () => {
  describe('twoFactorAuth.render', () => {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('renders twoFactorAuth enabled as Enabled if true', () => {
      const match = columns.find(el => el.key === 'twoFactorAuth')!
      const renderer = match.render! as any
      const { container } = render(<>{renderer(true)}</>)

      expect(container).toHaveTextContent('Enabled')
    })

    it('renders twoFactorAuth enabled as Pending if false', () => {
      const match = columns.find(el => el.key === 'twoFactorAuth')!
      const renderer = match.render! as any
      const { container } = render(<>{renderer(false)}</>)

      expect(container).toHaveTextContent('Pending')
    })
  })
})
