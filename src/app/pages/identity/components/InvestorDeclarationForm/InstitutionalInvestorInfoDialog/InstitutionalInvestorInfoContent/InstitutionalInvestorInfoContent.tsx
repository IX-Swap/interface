import React from 'react'
import { Grid } from '@mui/material'
import { Divider } from 'ui/Divider'
import { InstitutionalInvestorInfoItem } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorInfoDialog/InstitutionalInvestorInfoItem/InstitutionalInvestorInfoItem'

const mainContentList = [
  'The Government;',
  'a statutory board as may be prescribed by regulations made under section 341 of Securities and Futures Act;',
  'an entity that is wholly and beneficially owned, whether directly or indirectly,\n' +
    'by a central government of a country and whose principal activity is —',
  'any entity —',
  'a central bank in a jurisdiction other than Singapore;',
  'a central government in a country other than Singapore;',
  'an agency (of a central government in a country other than Singapore) that is\n' +
    'incorporated or established in a country other than Singapore;',
  'a multilateral agency, international organisation or supranational agency as \n' +
    'may be prescribed by regulations made under section 341;',
  'a bank that is licensed under the Banking Act 1970;',
  'a merchant bank that is licensed under the Banking Act 1970;',
  'a finance company that is licensed under the Finance Companies Act 1967;',
  'a company or co operative society that is licensed under the Insurance Act \n' +
    '1966 to carry on insurance business in Singapore;',
  'a company licensed under the Trust Companies Act 2005;',
  'a holder of a capital markets services licence;',
  'an approved exchange;',
  'a recognised market operator;',
  'an approved clearing house;',
  'a recognised clearing house',
  'a licensed trade repository;',
  'a licensed foreign trade repository;',
  'an approved holding company;',
  'a Depository as defined in section 81SF of Securities and Futures Act;',
  'an entity or a trust formed or incorporated in a jurisdiction other than Singapore,\n' +
    'which is regulated for the carrying on of any financial activity in that \n' +
    'jurisdiction by a public authority of that jurisdiction that exercises a \n' +
    'function that corresponds to a regulatory function of the Authority under \n' +
    'this Act, the Banking Act1970, the Finance Companies Act 1967, the Monetary \n' +
    'Authority of Singapore Act 1970, the Insurance Act 1966, the Trust Companies \n' +
    'Act 2005 or such other Act as may be prescribed by regulations made under section 341;',
  'a pension fund, or collective investment scheme, whether constituted in \n' +
    'Singapore or elsewhere;',
  'a person (other than an individual) who carries on the business of dealing in bonds with accredited investors or expert investors;',
  'the trustee of such trust as the Monetary Authority of Singapore Authority \n' +
    'may prescribe, when acting in that capacity; or',
  'such other person as the Monetary Authority of Singapore may prescribe.'
]

const thirdItemSubContentList = [
  'to manage its own funds',
  'to manage the funds of the central government of that country (which may include the reserves of that central government and any pension or provident fund of that country); or',
  'to manage the funds (which may include the reserves of that central government and any pension or provident fund of that country) of another entity that is wholly and beneficially owned, whether directly or indirectly, by the central government of that country;'
]

const fourthItemSubContentList = [
  'whose funds are managed by an entity mentioned in sub paragraph (3);',
  'to manage the funds of the central government of that country (which may include the reserves of that central government and any pension or provident fund of that country); or',
  'to manage the funds (which may include the reserves of that central government and any pension or provident fund of that country) of another entity that is wholly and beneficially owned, whether directly or indirectly, by the central government of that country;'
]

export const getWord = (index: number) => {
  switch (index) {
    case 1:
      return 'b)'
    case 2:
      return 'c)'
    default:
      return 'a)'
  }
}

export const InstitutionalInvestorInfoContent = () => {
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Divider />
      </Grid>

      {mainContentList.map((item, i) => {
        if (i === 2 || i === 3) {
          const list =
            i === 2 ? thirdItemSubContentList : fourthItemSubContentList
          return (
            <InstitutionalInvestorInfoItem index={i + 1} text={item}>
              <>
                {list.map((it, index) => (
                  <InstitutionalInvestorInfoItem
                    index={getWord(index)}
                    text={it}
                  />
                ))}
              </>
            </InstitutionalInvestorInfoItem>
          )
        }

        return <InstitutionalInvestorInfoItem index={i + 1} text={item} />
      })}

      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  )
}
