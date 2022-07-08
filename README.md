# InvestaX Platform WebApp

Built with [React](https://facebook.github.io/react/), [Material-UI](https://material-ui.com), [React Router](https://reacttraining.com/react-router/)

## Quick Start

```
git clone https://github.com/InvestaX/IXWebApp
yarn
cp .env.example .env #and update .env file
yarn start
```

**Hosted Instance**

[https://dev.mozork.com/](https://dev.mozork.com/)


**Webhooks**
Amplify Hooks
- Production (https://github.com/InvestaX/IXWebApp/settings/hooks/265590521)
- Development, MVP, and Staging (https://github.com/InvestaX/IXWebApp/settings/hooks/265590816)

# E2E Tests
- Tool - Playwright(playwright-test) [https://playwright.dev/]

- Covered Enviarements (DEV,OTC,Staging)

- Browsers (Chrome,Webkit,Firefox)

## Tests runner
- Command for running tests for each browser "npx playwright test"

- All settings are in the [playwright.config.ts] file

- Tests has different default credentials for each env(it is because we can't do some pre-conditions before testing)[__tests__/lib/credentials]

- For now by default Tests runs for CI only on chrome browser, pay attention to the [package.json/tests:e2e]

- Test results are saved in the "reports" folder. Report types [html,trace]