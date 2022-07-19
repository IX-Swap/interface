import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import { MetamaskPage } from '../page-object/metamaskPage'
import config from '../playwright.config'

export class LiquidityPoolsPage extends WebPage {
  readonly metamaskPage: MetamaskPage;
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly secondAmountOfTokensField: Locator;
  readonly chooseFirstTokenDropdown: Locator;
  readonly chooseSecondTokenDropdown: Locator;
  readonly ethTokenItem: Locator;
  readonly ixsTokenItem: Locator;
  readonly supplyButton: Locator;
  readonly confirmSupplyButtonSelector: string;
  readonly confirmSupplyButton: Locator;
  readonly transactionSubmittedPopUpCloseButton: Locator;
  readonly isxEthPoolDetailsDropdown: Locator;
  readonly wsecETHPoolDetailsDropdown: Locator;
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
  readonly createdIsxEthPool: Locator;
  readonly createdWsecETHPool: Locator;
  readonly firstTokenValueInLiquidityPool: Locator;
  readonly secondTokenValueInLiquidityPool: Locator;
  readonly liquidityPoolLoading: Locator;
  readonly liquidityPoolPreloader: Locator;
  readonly wsecTokenItem: Locator;
  readonly topPoolsLink: Locator;
  readonly liquidityPoolTitle: Locator;
  readonly openSettingsGearButton: Locator;
  readonly myLiquidityTitle: Locator;
  readonly importPoolLink: Locator;

  chooseTokenDropdownText = 'Choose token';
  confirmationPopUpText = 'Waiting For Confirmation';
  transactionSubmittedText = 'Transaction Submitted';
  ethTokenItemText = 'Ether';
  ixsTokenItemText = 'Ixs Token';
  wsecTokenItemText = 'WSec Test (WSEC)';
  isxEthPoolDetailsDropdownText = 'IXS/ETHM';
  wsecETHPoolDetailsDropdownText = 'WSEC/ETHM';
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
    this.ethTokenItem = page.locator(`[title='${this.ethTokenItemText}']`);
    this.ixsTokenItem = page.locator(`[title='${this.ixsTokenItemText}']`);
    this.wsecTokenItem = page.locator(`[title='${this.wsecTokenItemText}']`);
    this.supplyButton = page.locator('[data-testid="supply"]');
    this.confirmSupplyButtonSelector = ('[data-testid="create-or-supply"]');
    this.confirmSupplyButton = page.locator('[data-testid="create-or-supply"]');
    this.transactionSubmittedPopUpCloseButton = page.locator('[data-testid="return-close"]');
    this.isxEthPoolDetailsDropdown = page.locator(`text=${this.isxEthPoolDetailsDropdownText} >> [data-testid="openTable"]`);
    this.wsecETHPoolDetailsDropdown = page.locator(`text=${this.wsecETHPoolDetailsDropdownText} >> [data-testid="openTable"]`);
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
    this.createdIsxEthPool = page.locator(`//span[text()="My Liquidity"]//following::div[text()="${this.isxETHCreatedPoolText}"]`);
    this.createdWsecETHPool = page.locator(`//span[text()="My Liquidity"]//following::div[text()="${this.wsecETHCreatedPoolText}"]`);
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

  async checkThatDeletedLiquidityPoolIsNotVisible() {
    await expect(this.liquidityPoolLoading).not.toBeVisible();
    await this.page.waitForTimeout(5000);
    await expect(this.createdIsxEthPool).not.toBeVisible();
  }

  // Actions
  async clickTokenItem(token) {
    await this.page.locator(`//div[text()='${token}']`).click();
  }

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

  async clickTransactionSubmittedPopUpCloseButton() {
    await this.transactionSubmittedPopUpCloseButton.click();
  }

  async fillFirstAmountOfTokensField(value) {
    await this.firstAmountOfTokensField.fill(value);
  }

  async fillSecondAmountOfTokensField(value) {
    await this.secondAmountOfTokensField.fill(value);
  }

  async clickIsxEthPoolDetailsDropdown() {
    await this.isxEthPoolDetailsDropdown.click();
  }

  async clickWsecEthPoolDetailsDropdown() {
    await this.wsecETHPoolDetailsDropdown.click();
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

  async  removeCreatedLiqudityPoolIfItPresent() {
    await expect(this.liquidityPoolLoading).not.toBeVisible();
    await this.page.waitForTimeout(5000);
    if (await this.createdIsxEthPool.isVisible() || await this.createdWsecETHPool.isVisible()) {
      if (await this.createdIsxEthPool.isVisible()) {
        await this.removeLiquidityPool();
      } else if (await this.createdWsecETHPool.isVisible()) {
        await this.removeLiquidityPoolWithSecurityToken();
      }
    }
  }

  async removeCreatedLiqudityPool() {
    await this.page.goto(config.use.baseURL + '#/pool')
    await this.removeLiquidityPool();
  }

  async removeCreatedLiqudityPoolWithSecurityToken() {
    await this.page.goto(config.use.baseURL + '#/pool')
    await this.removeLiquidityPoolWithSecurityToken();
  }

  async removeLiquidityPool() {
    await this.clickIsxEthPoolDetailsDropdown();
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();

    const approveMetamaskPopUp = await this.openNewPageByClick(this.page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(this.metamaskPage.signButton);

    await this.clickRemovePoolButton();

    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.connectMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }

  async removeLiquidityPoolWithSecurityToken() {
    await this.clickWsecEthPoolDetailsDropdown();
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();

    const approveMetamaskPopUp = await this.openNewPageByClick(this.page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(this.metamaskPage.signButton);

    await this.clickRemovePoolButton();

    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.connectMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }

  async createLiqudityPoolWithDefinedAmountOfEth(page, ethAmount, firstToken, secondToken) {
    await this.clickAddLiquidityButton();
    await this.clickChooseFirstTokenDropdown();
    await this.clickTokenItem(firstToken);
    await this.fillFirstAmountOfTokensField(ethAmount);
    await this.clickChooseSecondTokenDropdown() ;
    await this.clickTokenItem(secondToken);

    await this.clickSupplyButton();

    const metamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSupplyButtonSelector);
    await metamaskPopUp.click(this.metamaskPage.connectMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }
}
