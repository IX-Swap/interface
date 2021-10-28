export const issuance = {
  LOADER: 'text="loading..."',
  ISSUANCE_TAB: '[href="/app/issuance/offerings"]',
  sections: { CREATE_DSO: '[href="/app/issuance/offerings/create"]' },
  dso: {
    TEXT_AREA: '[id="mui-rte-editor"]',
    LOGO: '[name="logo"]',

    buttons: {
      REMOVE_FAQ: '[name="dso-faqs"] >> text="Remove"',
      REMOVE: 'button >> text=Remove',
      ADD_NEW_VIDEO: 'text="ADD NEW VIDEO"',
      ADD_NEW_FAQ: 'text="ADD NEW FAQ"',
      ADD_TEAM_MEMBER: 'text="Add Team Member"',
      SUBSCRIPTION_DOCUMENT: '[id="subscriptionDocument"]',
      DATA_ROOM_FILE: '[id="dataroom-upload-and-append"]',
      FINISH_LATER: 'text="Finish Later"'
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
      COMPLETION_DATE: '[id="completionDate"]',
      LAUNCH_DATE: '[id="launchDate"]',
      TOKEN_NAME: '[id="tokenName"]',
      TOKEN_SYMBOL: '[id="tokenSymbol"]',
      IDENTIFIER_CODE: '[id="uniqueIdentifierCode"]',
      ISSUER_NAME: '[id="issuerName"]'
    },

    listBox: {
      DATA_ROOM: '[value="Other"]',
      DISTRIBUTION_FREQUENCY: '[id="distributionFrequency"]',
      DISTRIBUTION_VALUE: '[data-value="Monthly"]',

      CURRENCY: '[id="currency"]',
      CURRENCY_VALUE: 'text="USD"',

      CORPORATE: '[id="corporate"]',
      CORPORATE_VALUE: 'text="Test Company"',

      CAPITAL_STRUCTURE: '[id="capitalStructure"]',
      STRUCTURE_VALUE: '[data-value="Equity"]',

      NETWORK: '[id="network"]',
      NETWORK_VALUE: 'text="Ropsten Test Network (Public Ethereum)"'
    }
  }
}
