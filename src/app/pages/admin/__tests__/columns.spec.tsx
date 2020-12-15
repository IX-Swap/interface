/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render, cleanup } from 'test-utils'
import columns from 'app/pages/admin/columns'

describe('columns', () => {
  describe('twoFactorAuth.render', () => {
    afterEach(async () => {
      await cleanup()
      jest.clearAllMocks()
    })

    it('renders twoFactorAuth enabled as Yes if true', () => {
      const match = columns.find(el => el.key === 'twoFactorAuth')!
      const renderer = match.render! as any
      const { container } = render(<>{renderer(true)}</>)

      expect(container).toHaveTextContent('Yes')
    })

    it('renders twoFactorAuth enabled as No if false', () => {
      const match = columns.find(el => el.key === 'twoFactorAuth')!
      const renderer = match.render! as any
      const { container } = render(<>{renderer(false)}</>)

      expect(container).toHaveTextContent('No')
    })
  })
})
