import { TokenList } from '@uniswap/token-lists'
import schema from '@uniswap/token-lists/src/tokenlist.schema.json'
import Ajv from 'ajv'
import contenthashToUri from './contenthashToUri'
import { parseENSAddress } from './parseENSAddress'
import uriToHttp from './uriToHttp'

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema)

/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list URL
 * @param resolveENSContentHash resolves an ENS name to a contenthash
 */
export default async function getTokenList(
  listUrl: string,
  resolveENSContentHash: (ensName: string) => Promise<string>
): Promise<TokenList> {
  try {
    const parsedENS = parseENSAddress(listUrl)

    let urls: string[]
    if (parsedENS) {
      // Resolve ENS name to contenthash
      const contentHashUri = await resolveENSContentHash(parsedENS.ensName)
      // Translate contenthash to URI
      const translatedUri = contenthashToUri(contentHashUri)
      urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`)
    } else {
      urls = uriToHttp(listUrl)
    }

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const isLast = i === urls.length - 1
      try {
        const response = await fetch(url, { credentials: 'omit' })

        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`)
        }

        const json = await response.json()

        if (tokenListValidator(json)) {
          return json // Token list successfully fetched and validated
        } else {
          throw new Error(`Token list validation failed for ${url}`)
        }
      } catch (error) {
        if (isLast) {
          throw new Error(`Failed to download list ${listUrl}: ${error}`)
        }
        // Continue to the next URL
      }
    }

    throw new Error('Failed to fetch and validate token list from all URLs.')
  } catch (error) {
    throw error // Propagate any other errors
  }
}
