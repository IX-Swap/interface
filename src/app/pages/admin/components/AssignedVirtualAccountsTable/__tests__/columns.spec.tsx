import React from 'react'
import { render, cleanup } from 'test-utils'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'

describe('columns', () => {
  describe('assigned.renderAssignedDate', () => {
    afterEach(async () => {
      await cleanup()
      jest.clearAllMocks()
    })

    it('renders correct date', () => {
      const match = columns.find(el => el.key === 'assigned')
      const renderer = match?.render as any

      const date = new Date()
      const { container, rerender } = render(
        <>{renderer(date.setDate(date.getDate() - 1))}</>
      )

      expect(container).toHaveTextContent('1 day ago')

      rerender(<>{renderer(date.setDate(date.getDate() - 30))}</>)

      expect(container).toHaveTextContent('about 1 month ago')
    })
  })

  describe('renderAmount', () => {
    afterEach(async () => {
      await cleanup()
      jest.clearAllMocks()
    })

    it('renders correct amount string', () => {
      const match = columns.find(el => el.key === 'availableBalance')
      const renderer = match?.render as any

      const { container } = render(<>{renderer(10000)}</>)

      expect(container).toHaveTextContent('10,000.00')
    })
  })
})
