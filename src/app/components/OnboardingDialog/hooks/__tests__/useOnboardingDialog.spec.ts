// import { act, renderHook } from '@testing-library/react-hooks'
// import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import * as useSecurityRouter from 'app/pages/security/router'
import * as useSnackbar from 'hooks/useSnackbar'
import { cleanup } from 'test-utils'

describe('useOnboardingDialog', () => {
  const mockShowOnboardingDialog = jest.fn()
  const snackbarResponse = {
    showOnboardingDialog: mockShowOnboardingDialog
  }
  // const identitiesRouter = {
  //   paths: {
  //     createIndividual: '/individual',
  //     createCorporate: '/corporate'
  //   }
  // }
  const securityRouter = {
    paths: {
      setup2fa: '/setup2fa'
    }
  }

  // const investRouter = {
  //   paths: {
  //     landing: '/invest'
  //   }
  // }

  beforeEach(() => {
    jest
      .spyOn(useSnackbar, 'useSnackbar')
      .mockImplementation(() => snackbarResponse as any)
    jest
      .spyOn(useSecurityRouter, 'useSecurityRouter')
      .mockImplementation(() => securityRouter as any)
    // jest
    //   .spyOn(useInvestRouter, 'useInvestRouter')
    //   .mockImplementation(() => investRouter as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('calls snackbarService correctly for each method', async () => {
    // await act(async () => {
    //   const { result } = renderHook(() => useOnboardingDialog())
    //   await waitFor(
    //     () => {
    //       result.current.showEnable2FADialog()
    //       expect(mockShowOnboardingDialog).toHaveBeenCalledWith({
    //         title: 'Secure Your Account!',
    //         message: [
    //           'Increase your account security by enabling two factor authentication when signing into platform'
    //         ],
    //         action: '/setup2fa',
    //         actionLabel: 'Enable 2FA',
    //         closeLabel: 'Skip',
    //         closeArrow: false
    //       })
    //       result.current.showCreateAccountDialog()
    //       expect(mockShowOnboardingDialog).toHaveBeenCalledWith({
    //         title: 'Create an Identity',
    //         message: [
    //           'Please create your identity first before you can manage your Accounts.'
    //         ],
    //         closeLabel: 'Okay'
    //       })
    //       result.current.showPreIdentityCreateDialog('individual')
    //       expect(mockShowOnboardingDialog).toHaveBeenCalledWith({
    //         title: `Create individual Identity`,
    //         message: [
    //           `In compliance with our KYC/AML process. Please create your individual identity.`
    //         ],
    //         closeLabel: 'Okay',
    //         closeArrow: true
    //       })
    //       result.current.showOnboardingCompleteDialog()
    //       expect(mockShowOnboardingDialog).toHaveBeenCalledWith({
    //         title: 'Onboarding Complete!',
    //         message: [
    //           'You have completed the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!'
    //         ],
    //         actionLabel: 'Start Investing',
    //         action: '/invest'
    //       })
    //     },
    //     { timeout: 1000 }
    //   )
    // })
  })
})
