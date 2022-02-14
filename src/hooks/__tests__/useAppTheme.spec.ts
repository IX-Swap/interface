import { waitFor } from 'test-utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { useAppTheme } from '../useAppTheme'
import storageService from 'services/storage'
import { AppTheme } from 'themes/old'

describe('useAppTheme', () => {
  afterEach(async () => {
    storageService.remove('app-theme')
  })

  it('being initialised with theme type from localStorage', async () => {
    await act(async () => {
      const { result } = renderHook(useAppTheme)

      storageService.set('app-theme', AppTheme.System)

      await waitFor(() => {
        expect(result.current.themeType).toBe(AppTheme.System)
      })
    })
  })

  it('being initialised with "Light" theme by default if localStorage is empty', async () => {
    await act(async () => {
      const { result } = renderHook(useAppTheme)

      await waitFor(() => {
        expect(result.current.themeType).toBe(AppTheme.Light)
        expect(result.current.theme.palette.type).toBe('light')
      })
    })
  })

  it('returns correct material ui theme as expected', async () => {
    await act(async () => {
      const { result } = renderHook(useAppTheme)

      await waitFor(() => {
        expect(result.current.theme).toHaveProperty('shape')
        expect(result.current.theme).toHaveProperty('breakpoints')
        expect(result.current.theme).toHaveProperty('direction')
        expect(result.current.theme).toHaveProperty('mixins')
        expect(result.current.theme).toHaveProperty('overrides')
        expect(result.current.theme).toHaveProperty('palette')
        expect(result.current.theme).toHaveProperty('props')
        expect(result.current.theme).toHaveProperty('shadows')
        expect(result.current.theme).toHaveProperty('spacing')
        expect(result.current.theme).toHaveProperty('transitions')
        expect(result.current.theme).toHaveProperty('typography')
        expect(result.current.theme).toHaveProperty('zIndex')
      })
    })
  })

  it('changes the current theme (both in the state and the localStorage) if onChange has been called', async () => {
    await act(async () => {
      const { result } = renderHook(useAppTheme)

      await waitFor(() => {
        result.current.onChange(AppTheme.Dark)

        expect(result.current.themeType).toBe(AppTheme.Dark)
        expect(storageService.get('app-theme')).toBe(AppTheme.Dark)
        expect(result.current.theme.palette.type).toBe('dark')
      })
    })
  })
})
