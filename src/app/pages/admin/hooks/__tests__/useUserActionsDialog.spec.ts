import { renderHook } from '@testing-library/react-hooks'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { cleanup } from 'test-utils'

describe('useUserActionsDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', async () => {
    renderHook(() => useUserActionsDialog())
  })
})
