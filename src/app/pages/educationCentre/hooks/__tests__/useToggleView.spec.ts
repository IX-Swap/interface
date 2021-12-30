import { renderHook } from '@testing-library/react-hooks'
import { useToggleView } from 'app/pages/educationCentre/hooks/useToggleView'

describe('useToggleView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it returns correct data', () => {
    const { result } = renderHook(() => useToggleView())
    expect(result.current.view).toBe('grid')
    void result.current.toggleView()
    expect(result.current.view).toBe('list')
  })
})
