/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render } from 'test-utils'
import columns from 'app/pages/admin/components/columns'
import { loginHistory } from '__fixtures__/user'

describe('columns', () => {
  describe('createdAt.render', () => {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('renders createdAt correctly', () => {
      const match = columns.find(el => el.key === 'createdAt')!
      const renderer = match.render! as any

      const date = new Date()
      const { container, rerender } = render(
        <>{renderer(date.setDate(date.getDate() - 1))}</>
      )

      expect(container).toHaveTextContent('1 day ago')

      rerender(<>{renderer(date.setDate(date.getDate() - 30))}</>)

      expect(container).toHaveTextContent('about 1 month ago')
    })
  })

  describe('ip.render', () => {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('renders ip correctly', () => {
      const match = columns.find(el => el.key === 'ip')!
      const renderer = match.render! as any

      const { container } = render(
        <>{renderer(loginHistory.ip, loginHistory)}</>
      )

      expect(container).toHaveTextContent(
        'ip.add.res.s ( Olongapo City, Philippines )'
      )
    })
  })

  describe('userAgent.render', () => {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('renders userAgent correctly', () => {
      const match = columns.find(el => el.key === 'userAgent.name')!
      const renderer = match.render! as any

      const { container } = render(<>{renderer(loginHistory.userAgent.name)}</>)

      expect(container).toHaveTextContent('PostmanRuntime/7.26.8')
    })
  })
})
