export default {
  primaryOfferings: [
    {
      _id: '234234-234234234-234234234-422424',
      overview: {
        serialNumber: 'GOO-EQ-20200206',
        capitalStructure: 'Equity',
        investmentType: 'Hospitality',
        totalSupply: '100,000,000',
        status: 'Complete'
      },
      issuer: {
        companyName: 'Goodman Group',
        companyAddress: {
          line1: 'Level 17, 60 Castlereagh Street',
          line2: 'GPO Box 4703',
          city: 'Sydney',
          state: 'NSW',
          postalCode: '2001',
          phone: '+61 2 9230 7400'
        },
        contacts: [
          {
            contactName: 'John Doe',
            contactEmail: 'john@goodmangroup.com.au'
          }
        ]
      },
      information: {
        description: `GOO-EQ-20200206 is a common equity offering for an SVV fund in Singapore wth Real Estate assets in the Australian commercial mid-market.`,
        tokenPrice: '$1.00',
        target: '$100,000,000',
        jurisdiction: 'Austalia',
        issueDate: '6 February 2020',
        assetProfile: 'Fund',
        investmentManager: 'Jane Doe',
        lockupPeriod: '6 Months',
        totalRaised: '$3,451,000',
        percentRaised: '28.97%',
        targetReturn: '15%',
        targetAnnualCash: 'TBC',
        targetEquityMultiple: 'TBC',
        returnOnInvestment: 'TBC',
      },
      contract: {
        blockchainType: 'Enterprise Ethereum',
        blockchainNetwork: 'IX-CSRT-Singapore',
        environment: 'IX-ENV-Production',
        contractAddress: '0x84A0d77c693aDAbE0ebc48F88b3fFFF010577051',
        ownerAddress: '0xf4b6da8ae9c3ab6f706d7966bbc93c3c08d20bb9',
        capTable: [
          {
            name: 'Goodman Group',
            accountAddress: '0x84A0d77c693aDAbE0ebc48F88b3fFFF010577051',
            amount: 95000000
          },
          {
            name: 'Chad Lynch',
            accountAddress: '0x34773bb29A47D1106Ba2676236B20049ddb7dd74',
            amount: 5000000
          }
        ],
        transactions: [
          {
            txnHash: '0xfb0c8e482a62584e7b89bd2d602d6adf6309cd118c53df52c1d95b0022133afd',
            status: 'success',
            block: '944',
            timestamp: 15201928,
            from: '0x84A0d77c693aDAbE0ebc48F88b3fFFF010577051',
            to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            amount: 500000
          },
          {
            txnHash: '0x86f48ff1a1c909a2382d774e1f2dc53809cf98aedce8d771689eb5f71b019d78',
            status: 'success',
            block: '910',
            timestamp: 15201765,
            from: '0x28190x84A0d77c693aDAbE0ebc48F88b3fFFF010577051',
            to: '0x34773bb29A47D1106Ba2676236B20049ddb7dd74',
            amount: 1000000
          }
        ]
      },
      investors: [
        {
          type: 'Family Office',
          name: 'Cho Family',
          accountAddress: '0x84A0d77c693aDAbE0ebc48F88b3fFFF010577051',
          tokens: '500,000'
        },
        {
          type: 'Individual',
          name: 'Chad Lynch',
          accountAddress: '0x2F3030464aa543eB2cD679381679aD825fEEB222',
          tokens: '20,000,000'
        },
        {
          type: 'Institution',
          name: 'Seaside Capital Fund',
          accountAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          tokens: '100,000'
        },
        {
          type: 'Family Office',
          name: 'Kwok Private Holdings',
          accountAddress: '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c',
          tokens: '250,000'
        }
      ],
      distributors: [
        {
          companyName: 'IC SG PTE LTD',
          companyAddress: {
            line1: '5 Shentonway UIC Building',
            line2: '#10-01',
            city: 'Singapore',
            state: 'Singapore',
            postalCode: '068808',
            phone: '1-918'
          },
          contacts: [
            {
              contactName: 'Julian Kwan',
              contactEmail: 'julian@investax.io'
            },
            {
              contactName: 'Herbert Si',
              contactEmail: 'herbert@investax.io'
            }
          ]
        },
        {
          companyName: 'Skyhook Captial PTE LTD',
          companyAddress: {
            line1: '5 Shentonway UIC Building',
            line2: '#10-01',
            city: 'Singapore',
            state: 'Singapore',
            postalCode: '068808',
            phone: '1-918'
          },
          contacts: [
            {
              name: 'Lawrence Grinceri',
              contactEmail: 'julian@investax.io'
            },
            {
              name: 'Mel '
            }
          ]
        },
        {
          contactEmail: 'lawrence@skyhookcaptial.com'
        }
      ]
    }
  ]
}
