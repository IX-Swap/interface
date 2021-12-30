import { renderHook, act } from '@testing-library/react-hooks'
import { useAdminView } from 'app/pages/admin/hooks/useAdminView'
import { user } from '__fixtures__/user'
import { AppRole } from 'helpers/acl'

describe('useAdminView', () => {
  const refresh = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const {
      result: { current }
    } = renderHook(() => useAdminView(user, refresh))

    expect(current.open).toEqual(false)
    expect(current.setOpen).toBeDefined()
    expect(current.roles).toEqual(user.roles.split(','))
    expect(current.setRoles).toBeDefined()
    expect(current.handleRoleChange).toBeDefined()
    expect(current.handleChange).toBeDefined()
    expect(current.handleClose).toBeDefined()
    expect(current.handleConfirm).toBeDefined()
  })

  it('sets open to provided payload and to undefined if called with no arguments', async () => {
    const { result } = renderHook(() => useAdminView(user, refresh))

    void act(() => {
      result.current.setOpen(true)
    })
    expect(result.current.open).toEqual(true)

    void act(() => {
      result.current.setOpen(false)
    })
    expect(result.current.open).toEqual(false)
  })

  it('sets roles to provided payload and to undefined if called with no arguments through handleRoleChange', async () => {
    const { result } = renderHook(() => useAdminView(user, refresh))

    void act(() => {
      result.current.handleRoleChange([AppRole.ACCREDITED, AppRole.AUTHORIZER])
    })
    expect(result.current.roles).toEqual([
      AppRole.ACCREDITED,
      AppRole.AUTHORIZER
    ])
  })

  it('sets open to true when handleChange is invoked with any payload', () => {
    const { result } = renderHook(() => useAdminView(user, refresh))

    void act(() => {
      result.current.handleChange('false')
    })
    expect(result.current.open).toEqual(true)
  })

  it('sets open to false when handleClose is invoked', () => {
    const { result } = renderHook(() => useAdminView(user, refresh))

    void act(() => {
      result.current.handleClose()
    })
    expect(result.current.open).toEqual(false)
  })

  it('calls refresh and sets open to false when handleConfirm is invoked', async () => {
    const { result } = renderHook(() => useAdminView(user, refresh))

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(refresh).toHaveBeenCalledTimes(1)
    expect(result.current.open).toEqual(false)
  })

  it('sets open to false when handleConfirm is invoked if refresh is undefined', async () => {
    const { result } = renderHook(() => useAdminView(user, undefined as any))

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(refresh).toHaveBeenCalledTimes(0)
    expect(result.current.open).toEqual(false)
  })
})
