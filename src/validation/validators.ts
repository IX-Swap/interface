import isPast from 'date-fns/isPast'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { hasValue } from 'helpers/forms'

const passwordPatterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]

export const passwordValidator = {
  uppercaseLettersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[0].test(value)
    }

    return false
  },

  lowercaseLettersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[1].test(value)
    }

    return false
  },

  numbersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[2].test(value)
    }

    return false
  },

  specialCharactersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[3].test(value)
    }

    return false
  }
}

export const individualAccreditedInvestorValidator = (
  value: Partial<IndividualDeclarations> | null | undefined
) => {
  if (value === null || value === undefined) {
    return false
  }

  const {
    NetPersonalAssets,
    IndividualIncome,
    IndividualFinancialAsset,
    JointlyHeldAccount
  } = value

  return (
    NetPersonalAssets === DeclarationValue.Yes ||
    IndividualFinancialAsset === DeclarationValue.Yes ||
    IndividualIncome === DeclarationValue.Yes ||
    JointlyHeldAccount === DeclarationValue.Yes
  )
}

export const corporateAccreditedInvestorValidator = (
  value: Partial<CorporateDeclarations> | null | undefined
) => {
  if (value === null || value === undefined) {
    return false
  }

  const {
    NetAssets,
    ShareholderIsAccreditedInvestor,
    AllPartnersAreAccreditedInvestors,
    AllBeneficiariesAreAccreditedInvestors
  } = value

  return (
    NetAssets === DeclarationValue.Yes ||
    ShareholderIsAccreditedInvestor === DeclarationValue.Yes ||
    AllPartnersAreAccreditedInvestors === DeclarationValue.Yes ||
    AllBeneficiariesAreAccreditedInvestors === DeclarationValue.Yes
  )
}

export const pastDateValidator = (value: string | null | undefined) => {
  if (value === undefined || value === null) {
    return false
  }

  return !isPast(new Date(value))
}

export const validateUEN = (uen: any) => {
  const entityTypeIndicator = [
    'LP',
    'LL',
    'FC',
    'PF',
    'RF',
    'MQ',
    'MM',
    'NB',
    'CC',
    'CS',
    'MB',
    'FM',
    'GS',
    'GA',
    'GB',
    'DP',
    'CP',
    'NR',
    'CM',
    'CD',
    'MD',
    'HS',
    'VH',
    'CH',
    'MH',
    'CL',
    'XL',
    'CX',
    'RP',
    'TU',
    'TC',
    'FB',
    'FN',
    'PA',
    'PB',
    'SS',
    'MC',
    'SM'
  ]

  // check that uen is not empty
  if (uen === undefined || String(uen) === '') {
    return 'UEN is empty'
  }

  // check if uen is 9 or 10 digits
  if (uen.length < 9 || uen.length > 10) {
    return 'UEN is not 9 or 10 digits'
  }

  uen = uen.toUpperCase()
  const uenStrArray = uen.split('')

  // (A) Businesses registered with ACRA
  if (uenStrArray.length === 9) {
    // check that last character is a letter
    if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
      return 'Last character is not an alphabet'
    }

    for (const element of uenStrArray) {
      if (isNaN(element)) {
        return 'There are non-numbers in 1st to 8th letters'
      }
    }

    // (A) Businesses registered with ACRA (SUCCESS)
    return true
  } else if (uenStrArray.length === 10) {
    // check that last character is a letter
    if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
      return 'Last character is not an alphabet'
    }

    // (B) Local companies registered with ACRA
    if (
      !isNaN(uenStrArray[0]) &&
      !isNaN(uenStrArray[1]) &&
      !isNaN(uenStrArray[2]) &&
      !isNaN(uenStrArray[3])
    ) {
      // check that 5th to 9th letters are all numbers
      if (
        !isNaN(uenStrArray[4]) &&
        !isNaN(uenStrArray[5]) &&
        !isNaN(uenStrArray[6]) &&
        !isNaN(uenStrArray[7]) &&
        !isNaN(uenStrArray[8])
      ) {
        // (B) Local companies registered with ACRA (SUCCESS)
        return true
      } else {
        return 'There are non-numbers in 5th to 9th letters'
      }
    }
    // (C) All other entities which will be issued new UEN
    else {
      // check that 1st letter is either T or S or R
      if (
        uenStrArray[0] !== 'T' &&
        uenStrArray[0] !== 'S' &&
        uenStrArray[0] !== 'R'
      ) {
        return '1st letter is incorrect'
      }

      // check that 2nd and 3rd letters are numbers only
      if (isNaN(uenStrArray[1]) || isNaN(uenStrArray[2])) {
        return '2nd and 3rd letter is incorrect'
      }

      // check that 4th letter is an alphabet
      if (!isNaN(uenStrArray[3])) {
        return '4th letter is not an alphabet'
      }

      // check entity-type indicator
      let entityTypeMatch = false
      const entityType = String(uenStrArray[3]) + String(uenStrArray[4])

      for (const element of entityTypeIndicator) {
        if (element === String(entityType)) {
          entityTypeMatch = true
        }
      }
      if (!entityTypeMatch) {
        return 'Entity-type indicator is invalid'
      }

      // check that 6th to 9th letters are numbers only
      if (
        isNaN(uenStrArray[5]) ||
        isNaN(uenStrArray[6]) ||
        isNaN(uenStrArray[7]) ||
        isNaN(uenStrArray[8])
      ) {
        return '2nd and 3rd letter is incorrect'
      }

      // (C) All other entities which will be issued new UEN (SUCCESS)
      return true
    }
  }

  return false
}

export const uniqueIdentifierCodeValidator = (value: string) => {
  if (value.length < 12) {
    return 'Unique Identifier Code must be at least 12 characters'
  }
  if (value.length > 32) {
    return 'Unique Identifier Code must be at most 32 characters'
  }
}
