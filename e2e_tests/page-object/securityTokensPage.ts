import { WebPage } from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class SecurityTokensPage extends WebPage {
  readonly securityTokensTitle: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.securityTokensTitle = page.locator('[data-testid="securityTokensTitle"]');
  }
}


