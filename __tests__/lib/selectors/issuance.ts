import { text } from '../helpers/text'
export const issuance = {
  BASE_FORM: '//form',
  LISTING_FORM: '[data-testid="listing-form"]',
  LOADER: 'text="loading..."',
  ISSUANCE_TAB: '[href="/app/issuance/dashboard"]',
  FUNDS_MANAGEMENT_TAB: '[href="/app/issuance/offerings/:issuerId/:dsoId/overview"]',

  sections: {
    CREATE_DSO: '[href="/app/issuance/offerings/create"]',
    VIEW_DSO_LISTENING: '[href="/app/issuance/dashboard"]',
    VIEW_EXCHANGE_LISTINGS: '[href="/app/otc-market/my-listings"]',
    CREATE_EXCHANGE_LISTINGS: '[href="/app/otc-market/my-listings/create"]'
  },

  listings: {
    GENERAL_FORM: '[name="listing-general-information"]',
    LOGO: '[class="MuiAvatar-img"]',
    fields: {
      MIN_TRADE_AMOUNT: '[id="minimumTradeUnits"]',
      MAX_TRADE_AMOUNT: '[id="maximumTradeUnits"]',
      RAISED_AMOUNT: '[id="raisedAmount"]',
      DOCS: '[name="listing-documents"] input'
    },
    buttons: {
      IMPORT: 'text="IMPORT"',
      SUBMIT: 'button >> text=Submit',
      IMPORT_DSO: '[name="isNewListing"][value="no"]'
    },
    listBox: {
      DSO_STATE: '[aria-disabled="true"]',
      MY_DSO: '[class*="MuiInputBase-root "]',
      DSO_HYBRID_TEST: '[data-value="619f5dfcc3f27a0e5f2abde8:6183f9f31c353d0e65ec9b66"]'
    }
  },

  dso: {
    DSO_INFORMATION: '[name="dso-pricing"]',
    FORM: '[data-testid="dso-form"]',
    TEXT_AREA: '[id="mui-rte-editor"]',
    LOGO: '[name="logo"]',
    TOKEN_DEPLOY_SECTION: 'text=Deploy Token',

    buttons: {
      PREVIEW: '[data-testid="preview"]',
      SAVE: 'button >> text="Save"',
      SUBMIT: 'button >> text="Submit"',
      TOKEN_DEPLOY: 'button >> text=Deploy',
      CREATE_DSO: "//a[text()='Create New DSO']",
      REMOVE_FAQ: '[name="dso-faqs"] >> text="Remove"',
      REMOVE: 'button >> text=Remove',
      ADD_NEW_VIDEO: 'text="ADD NEW VIDEO"',
      ADD_NEW_FAQ: 'text="ADD NEW FAQ"',
      ADD_TEAM_MEMBER: 'text="Add Team Member"',
      SUBSCRIPTION_DOCUMENT: '[id="subscriptionDocument"]',
      DATA_ROOM_FILE: '[id="dataroom-upload-and-append"]',

      FINISH_LATER: 'text=/Save\\s*draft/i',
      VIEW_THIS_DSO: 'text=View this DSO',
      VIEW_MY_DSO: 'text=View My DSOs',
      EDIT_DSO: 'text=Edit DSO'
    },
    fields: {
      FAQ_1: '[id="faqs[0].question"]',
      FAQ_1_ANSWER: '[id="faqs[0].answer"]',
      FAQ_2: '[id="faqs[1].question"]',
      FAQ_2_ANSWER: '[id="faqs[1].answer"]',
      FAQ_3: '[id="faqs[2].question"]',
      FAQ_3_ANSWER: '[id="faqs[2].answer"]',
      FAQ_INPUTS: '[name="dso-faqs"] fieldset',
      VIDEO_TITLE: '[id="videos[0].title"]',
      VIDEO_LINK: '[id="videos[0].link"]',
      VIDEO_INPUTS: '[name="dso-videos"] fieldset',
      TEAM_MEMBER_INPUTS: '[name="dso-team"] input',
      TEAM_MEMBER_PHOTO: '[id="team[0].photo"]',
      TEAM_MEMBER_POSITION: '[id="team[0].position"]',
      TEAM_MEMBER_NAME: '[id="team[0].name"]',
      EQUITY_MULTIPLE: '[id="equityMultiple"]',
      LEVERAGE: '[id="leverage"]',
      INVESTMENT_STRUCTURE: '[id="investmentStructure"]',
      GROSS_IRR: '[id="grossIRR"]',
      INTEREST_RATE: '[id="interestRate"]',
      DIVIDEND_YIELD: '[id="dividendYield"]',
      INVESTMENT_PERIOD: '[id="investmentPeriod"]',
      MINIMUM_INVESTMENT: '[id="minimumInvestment"]',
      TOTAL_FUNDRAISING_AMOUNT: '[id="totalFundraisingAmount"]',
      PRICEPER_UNIT: '[id="pricePerUnit"]',
      COMPLETION_DATE: '[id="mui-4"]', //id="completionDate"
      LAUNCH_DATE: '[id="mui-2"]', // [id="launchDate"]
      TOKEN_NAME: '[id="tokenName"]',
      TOKEN_SYMBOL: '[id="tokenSymbol"]',
      IDENTIFIER_CODE: '[id="uniqueIdentifierCode"]',
      ISSUER_NAME: '[id="issuerName"]',
      SUBSCRIPTION_DOCUMENT: '[name="subscriptionDocument"]',
      DATA_ROOM: '[id="dataroom-upload-and-append"]',
      DECIMALS: '[id="decimals"]'
    },

    listBox: {
      DATA_ROOM: '[value="Other"]',
      DISTRIBUTION_FREQUENCY: '[id="distributionFrequency"]',
      DISTRIBUTION_VALUE: '[data-value="Monthly"]',

      CURRENCY: '[id="currency"]',
      CURRENCY_VALUE: 'text="USD"',

      CORPORATE: '[id="corporate"]',
      CORPORATE_VALUE: '[role="listbox"] [tabindex="0"]',

      CAPITAL_STRUCTURE: '[id="capitalStructure"]',
      STRUCTURE_VALUE: '[data-value="Equity"]',

      NETWORK: '[id="network"]',
      // NETWORK_VALUE: 'text="Ropsten Test Network (Public Ethereum)"'
      NETWORK_VALUE: `text="${text.ETH_NET_NAME}"`
    }
  }
}
