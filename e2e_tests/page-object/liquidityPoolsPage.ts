import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import { MetamaskPage } from './metamaskPage'
import config from '../playwright.config'

export class LiquidityPoolsPage extends WebPage {
  readonly metamaskPage: MetamaskPage;
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly secondAmountOfTokensField: Locator;
  readonly chooseFirstTokenDropdown: Locator;
  readonly chooseSecondTokenDropdown: Locator;
  readonly supplyButton: Locator;
  readonly confirmSupplyButtonSelector: string;
  readonly confirmSupplyButton: Locator;
  readonly removeLiquidityButton: Locator;
  readonly maxRemovePercentageButton: Locator;
  readonly approveRemovePoolButton: string;
  readonly removePoolButton: Locator;
  readonly confirmRemovePoolButton: string;
  readonly quarterRemovePercentageButton: Locator;
  readonly halfRemovePercentageButton: Locator;
  readonly halfAndQuarterRemovePercentageButton: Locator;
  readonly addNewAmountToLiqudityPoolButton: Locator;
  readonly transactionSubmittedPopUpText: Locator;
  readonly waitingForConfirmationPopUpText: Locator;
  readonly firstTokenValueInLiquidityPool: Locator;
  readonly secondTokenValueInLiquidityPool: Locator;
  readonly liquidityPoolLoading: Locator;
  readonly liquidityPoolPreloader: Locator;
  readonly topPoolsLink: Locator;
  readonly liquidityPoolTitle: Locator;
  readonly openSettingsGearButton: Locator;
  readonly myLiquidityTitle: Locator;
  readonly importPoolLink: Locator;

  chooseTokenDropdownText = 'Choose token';
  confirmationPopUpText = 'Waiting For Confirmation';
  transactionSubmittedText = 'Transaction Submitted';
  wsecETHCreatedPoolText = 'WSEC/ETH';
  isxETHCreatedPoolText = 'IXS/ETH';
  topPoolsLinkText = 'Top PoolsExplore popular pools on IX Swap Analytics';
  liquidityPoolTitleText = 'Liquidity Pool';
  myLiquidityTitleText = 'My Liquidity';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.addLiquidityButton = page.locator('[data-testid="add-liquidity"]');
    this.firstAmountOfTokensField = page.locator('[data-testid="add-liquidity-input-tokena"] >> input');
    this.secondAmountOfTokensField = page.locator('[data-testid="add-liquidity-input-tokenb"] >> input');
    this.chooseFirstTokenDropdown = page.locator(`[data-testid="add-liquidity-input-tokena"] >> button:has-text('${this.chooseTokenDropdownText}')`);
    this.chooseSecondTokenDropdown = page.locator(`[data-testid="add-liquidity-input-tokenb"] >> button:has-text('${this.chooseTokenDropdownText}')`);
    this.supplyButton = page.locator('[data-testid="supply"]');
    this.confirmSupplyButtonSelector = ('[data-testid="create-or-supply"]');
    this.confirmSupplyButton = page.locator('[data-testid="create-or-supply"]');
    this.removeLiquidityButton = page.locator('[data-testid="remove-liquidity"]');
    this.quarterRemovePercentageButton = page.locator('[data-testid="percentage_25"]');
    this.halfRemovePercentageButton = page.locator('[data-testid="percentage_50"]');
    this.halfAndQuarterRemovePercentageButton = page.locator('[data-testid="percentage_75"]');
    this.maxRemovePercentageButton = page.locator('[data-testid="percentage_100"]');
    this.approveRemovePoolButton = ('[data-testid="approve-currency-a-remove"]');
    this.removePoolButton = page.locator('[data-testid="approve-currency-b-remove"]');
    this.confirmRemovePoolButton = ('[data-testid="confirm-remove"]');
    this.addNewAmountToLiqudityPoolButton = page.locator('[data-testid="add-to-liquidity"]');
    this.transactionSubmittedPopUpText = page.locator(`text=${this.transactionSubmittedText}`);
    this.waitingForConfirmationPopUpText = page.locator(`text=${this.confirmationPopUpText}`);
    this.firstTokenValueInLiquidityPool = page.locator('[data-testid="tableRow"] >> nth=0 >> [class="css-vurnku"] >> nth=1');
    this.secondTokenValueInLiquidityPool = page.locator('[data-testid="tableRow"] >> nth=1 >> [class="css-vurnku"] >> nth=1');
    this.liquidityPoolLoading = page.locator('text=Loading');
    this.liquidityPoolPreloader = page.locator('[alt="Loading..."]');
    this.topPoolsLink = page.locator(`a:has-text("${this.topPoolsLinkText}") >> nth=0`);
    this.liquidityPoolTitle = page.locator(`span:has-text("${this.liquidityPoolTitleText}")`);
    this.openSettingsGearButton = page.locator(`[data-testid="open-settings-button"]`);
    this.myLiquidityTitle = page.locator(`text=${this.myLiquidityTitleText}`);
    this.importPoolLink = page.locator(`[data-testid="find-pool-button"]`);
  }

  // Assertions
  async isEthAmountThatWillBeReceivedShown(amount) {
    await expect(this.page.locator(`text=${amount} >> nth=1`)).toBeVisible();
  }

  async checkThatDeletedLiquidityPoolIsNotVisible(pool) {
    await expect(this.liquidityPoolLoading).not.toBeVisible();
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(`//span[text()="My Liquidity"]//following::div[text()="${pool}"]`)).not.toBeVisible();
  }

  async checkThatCreatedPoolIsVisible(pool) {
    await expect(this.page.locator(`//span[text()="My Liquidity"]//following::div[text()="${pool}"]`)).toBeVisible()
  }

  // Actions
  async clickQuarterRemovePercentageButton() {
    await this.quarterRemovePercentageButton.click();
  }

  async clickHalfRemovePercentageButton() {
    await this.halfRemovePercentageButton.click();
  }

  async clickHalfAndQuarterRemovePercentageButton() {
    await this.halfAndQuarterRemovePercentageButton.click();
  }

  async clickAddLiquidityButton() {
    await this.addLiquidityButton.click();
  }

  async clickChooseFirstTokenDropdown() {
    await this.chooseFirstTokenDropdown.click();
  }

  async clickChooseSecondTokenDropdown() {
    await this.chooseSecondTokenDropdown.click();
  }

  async clickSupplyButton() {
    await this.supplyButton.click();
  }

  async fillFirstAmountOfTokensField(value) {
    await this.firstAmountOfTokensField.fill(value);
  }

  async fillSecondAmountOfTokensField(value) {
    await this.secondAmountOfTokensField.fill(value);
  }

  async clickPoolDetailsDropdown(pool) {
    await this.page.click(`text=${pool}M >> [data-testid="openTable"]`);
  }

  async clickRemoveLiquidityButton() {
    await this.removeLiquidityButton.click();
  }

  async clickMaxRemovePercentageButton() {
    await this.maxRemovePercentageButton.click();
  }

  async clickRemovePoolButton() {
    await this.removePoolButton.click();
  }

  async clickAddNewAmountToLiqudityPoolButton() {
    await this.addNewAmountToLiqudityPoolButton.click();
  }

  async getSecondTokenValueOfThePool() {
    await expect(this.secondAmountOfTokensField).toHaveAttribute('value', /.+/)
    return await this.secondAmountOfTokensField.getAttribute('value');
  }

  async getSecondTokenValueOfTheCreatedPool() {
    await expect(this.liquidityPoolPreloader).not.toBeVisible();
    await this.page.waitForTimeout(5000);
    const secondTokenValue = await this.secondTokenValueInLiquidityPool.innerText();
    return parseFloat(secondTokenValue);
  }

  async rejectPoolCreationViaMetamaskPopUp() {
    const metamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSupplyButtonSelector);
    await metamaskPopUp.click(this.metamaskPage.rejectButton);
  }

  async approvePoolRemovingViaMetamask() {
    const approveMetamaskPopUp = await this.openNewPageByClick(this.page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(this.metamaskPage.signButton);
  }

  async  removeCreatedLiqudityPoolIfItPresent(poolsArray) {
    for (const pools of poolsArray) {
      await expect(this.liquidityPoolLoading).not.toBeVisible();
      await this.page.waitForTimeout(5000);
      if (await this.page.isVisible(`//span[text()="My Liquidity"]//following::div[text()="${pools}"]`)) {
        await this.removeCreatedLiqudityPool(pools);
      }
    }
  }

  async removeCreatedLiqudityPool(pool) {
    await this.page.goto(config.use.baseURL + '#/pool')
    await this.removeLiquidityPool(pool);
  }

  async removeLiquidityPool(pool) {
    await this.clickPoolDetailsDropdown(pool);
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();

    const approveMetamaskPopUp = await this.openNewPageByClick(this.page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(this.metamaskPage.signButton);

    await this.clickRemovePoolButton();

    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.confirmMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }

  async createLiqudityPoolWithDefinedAmountOfEth(page, ethAmount, firstToken, secondToken) {
    await this.clickAddLiquidityButton();
    await this.clickChooseFirstTokenDropdown();
    await this.clickTokenItem(firstToken);
    await this.fillFirstAmountOfTokensField(ethAmount);
    await this.clickChooseSecondTokenDropdown();
    await this.clickTokenItem(secondToken);

    await this.clickSupplyButton();

    const metamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSupplyButtonSelector);
    await metamaskPopUp.click(this.metamaskPage.confirmMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }
}
