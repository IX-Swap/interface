import { AccreditationStatusEnum } from 'components/Vault/enum'
import rejectedIcon from 'assets/images/newReject.svg'
import approvedIcon from 'assets/images/newRightCheck.svg'
import pendingIcon from 'assets/images/newPending.svg'

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const fixCapitalization = (words: string[]) => {
  return [capitalizeFirstLetter(words[0]), ...words.slice(1).map((word) => word.toLocaleLowerCase())]
}

export const convert = (obj: any): string =>
  Object.entries(obj)
    .map(([key, value]) =>
      typeof value === 'string'
        ? `\t${fixCapitalization(key.split(/(?=[A-Z])/)).join(' ')}: \t${value};\n`
        : `\n\t${key}: \n${convert(value)}\n`
    )
    .join('')

export const getStatusIcon = (status: string) => {
  switch (status) {
    case AccreditationStatusEnum.DECLINED:
    case AccreditationStatusEnum.FAILED:
      return rejectedIcon
    case AccreditationStatusEnum.APPROVED:
      return approvedIcon
    default:
      return pendingIcon
  }
}
