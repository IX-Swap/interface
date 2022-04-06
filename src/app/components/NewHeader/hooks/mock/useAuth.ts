export const useAuth = () => {
  const mockUser = {
    createdAt: '2021-02-08T10:57:01.119Z',
    email: 'gleb@investax.io',
    enabled: true,
    failAttempts: 0,
    lockedOut: false,
    name: 'Gleb Andreevich Vinokurov',
    roles: 'user,authorizer,admin,accredited,issuer,fundmanager',
    totpConfirmed: true,
    updatedAt: '2022-03-01T13:38:12.366Z',
    verified: true,
    __v: 0,
    _id: '602118fd102da53b8b5a8fc3'
  }

  return {
    isAuthenticated: true,
    user: mockUser
  }
}
