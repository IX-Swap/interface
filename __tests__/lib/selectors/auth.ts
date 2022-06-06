export const authForms = {
  buttons: {
    LOGIN: "text='Login'",
    AGREE: '[name="agree"]',
    SUBMIT: '[type="submit"]',
    REGISTRATION: 'form >> text="Create an Account."',
    FORGOT: '[href="/auth/reset"]',
    // TWO_FA: '[data-testid="first-button"]',
    TWO_FA: '[href="/app/settings/setup-2fa"]',

    NEXT: 'BUTTON >> text="Next"',
    ENABLE: 'BUTTON >> text="Enable"',
    SIGN_OUT: 'text="Sign Out"',
    PROFILE_VIEW: '[aria-controls="profile-menu"]'
  },
  fields: {
    NAME: "[id='name']",
    EMAIL: '[name="email"]',
    PASSWORD: '[id="password"]',
    NEW_PASSWORD: '[id="newPassword"]',
    OLD_PASSWORD: "[id='oldPassword']",
    CONFIRM_PASSWORD: "[id='confirmPassword']"
  }
}
