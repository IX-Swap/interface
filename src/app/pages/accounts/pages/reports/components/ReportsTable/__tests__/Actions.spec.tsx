import React from 'react'
import { renderWithUserStore, cleanup } from 'test-utils'
import { getPathWithQueryParams } from 'app/pages/accounts/pages/reports/components/ReportsTable/Actions'
import { Actions } from '../Actions'
import { reportsItems } from 'app/pages/accounts/pages/reports/components/ReportsTable/ReportsTable'

describe('Actions', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    const { container } = renderWithUserStore(
      <Actions item={reportsItems[0]} />
    )
  })
})

describe('getPathWithQueryParams', () => {
  it('return correct path', () => {
    expect(
      getPathWithQueryParams(
        'test',
        '2021-11-23T11:01:14.920Z',
        '2021-11-23T11:01:14.920Z'
      )
    ).toBe(
      'test?toDate=2021-11-23T11:01:14.920Z&fromDate=2021-11-23T11:01:14.920Z'
    )
  })

  it('return correct path when toDate and fromDate is undefined', () => {
    expect(getPathWithQueryParams('test', undefined, undefined)).toBe('test')
  })

  it('return correct path when fromDate is undefined', () => {
    expect(
      getPathWithQueryParams('test', '2021-11-23T11:01:14.920Z', undefined)
    ).toBe('test?toDate=2021-11-23T11:01:14.920Z')
  })

  it('return correct path when toDate is undefined', () => {
    expect(
      getPathWithQueryParams('test', undefined, '2021-11-23T11:01:14.920Z')
    ).toBe('test?fromDate=2021-11-23T11:01:14.920Z')
  })
})
