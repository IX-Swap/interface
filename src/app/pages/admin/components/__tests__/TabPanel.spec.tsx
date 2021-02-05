import React from 'react'
import { render, cleanup } from 'test-utils'
import { TabPanel, TabPanelProps } from 'app/pages/admin/components/TabPanel'
import Box from '@material-ui/core/Box'

jest.mock('@material-ui/core/Box', () =>
  jest.fn(({ children }) => <div>{children}</div>)
)

describe('TabPanel', () => {
  const MockComp = jest.fn(() => <></>)
  const props: TabPanelProps = {
    value: 0,
    index: 0,
    children: MockComp
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TabPanel {...props} />)
  })

  it('renders container as hidden when value and index are not equal', () => {
    props.value = 1
    render(<TabPanel {...props} />)
    expect(Box).toHaveBeenLastCalledWith(
      { hidden: true, children: MockComp },
      {}
    )
  })
})
