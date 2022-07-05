import React from 'react'
import { Trans } from '@lingui/macro'

import { ReactComponent as telegramImg } from 'assets/images/social/Telegram.svg'
import { ReactComponent as twitterImg } from 'assets/images/social/Twitter.svg'
import { ReactComponent as linkedinImg } from 'assets/images/social/Linkedin.svg'
import { ReactComponent as youtubeImg } from 'assets/images/social/Youtube.svg'
import { ReactComponent as coingekoImg } from 'assets/images/social/Coingeko.svg'
import { ReactComponent as discordImg } from 'assets/images/social/Discord.svg'
import { ReactComponent as coinmarketcapImg } from 'assets/images/social/Coinmarketcap.svg'
import { ReactComponent as redditImg } from 'assets/images/social/Reddit.svg'
import { ExternalLink } from 'theme'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { SocialBlockContainer } from './styleds'

const data = [
  { href: 'https://t.me/ixswapofficial', Icon: telegramImg, name: 'telegram' },
  { href: 'https://twitter.com/IxSwap', Icon: twitterImg, name: 'twitter' },
  { href: 'https://www.linkedin.com/company/ixswap', Icon: linkedinImg, name: 'linkedin' },
  { href: 'https://www.youtube.com/channel/UCaYPNR-eLs9iuB5ZVKRx-fw', Icon: youtubeImg, name: 'youtube' },
  { href: 'https://www.coingecko.com/en/coins/ix-swap', Icon: coingekoImg, name: 'coingeko' },
  { href: 'https://discord.gg/uHyFMyXjl', Icon: discordImg, name: 'discor' },
  { href: 'https://coinmarketcap.com/currencies/ix-swap/', Icon: coinmarketcapImg, name: 'coinmarket' },
  { href: 'https://www.reddit.com/r/IXSwapOfficial/', Icon: redditImg, name: 'reddit' },
]

export const SocialBlock = () => {
  const { config } = useWhitelabelState()

  return (
    <SocialBlockContainer>
      <div>
        <Trans>Keep in Touch</Trans>
      </div>
      <div>
        {data.map(({ href, Icon, name }) => {
          const link = config?.footerConfig?.socialLinks?.[name]
          const shouldShow = config?.footerConfig?.socialLinks ? link : true

          if (!shouldShow) return null

          return (
            <ExternalLink href={link || href} key={link || href}>
              <Icon />
            </ExternalLink>
          )
        })}
      </div>
    </SocialBlockContainer>
  )
}
