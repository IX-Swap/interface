export const authForms = {
  buttons: {
    LOGIN: "text='Login'",
    AGREE: '[name="agree"]',
    SUBMIT: '[data-testid="submit"]',
    REGISTRATION: '[href="/auth/register"]',
    FORGOT: '[href="/auth/reset"]',
    TWO_FA: '[href="/app/settings/setup-2fa"]',
    NEXT: 'BUTTON >> text="Next"',
    ENABLE: 'BUTTON >> text="Enable"'
  },
  fields: {
    EMAIL: '[name="email"]',
    PASSWORD: '[id="password"]',
    NAME: "[id='name']"
  }
}
