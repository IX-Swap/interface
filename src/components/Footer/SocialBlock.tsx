import React from 'react'
import { Trans } from '@lingui/macro'

import telegramImg from 'assets/images/social/Telegram.svg'
import twitterImg from 'assets/images/social/Twitter.svg'
import linkedinImg from 'assets/images/social/Linkedin.svg'
import youtubeImg from 'assets/images/social/Youtube.svg'
import coingekoImg from 'assets/images/social/Coingeko.svg'
import discordImg from 'assets/images/social/Discord.svg'
import coinmarketcapImg from 'assets/images/social/Coinmarketcap.svg'
import redditImg from 'assets/images/social/Reddit.svg'
import { routes } from 'utils/routes'
import { ExternalLink } from 'theme'

import { SocialBlockContainer } from './styleds'

const data = [
  { href: 'https://t.me/ixswapofficial', icon: telegramImg },
  { href: 'https://twitter.com/IxSwap', icon: twitterImg },
  { href: 'https://www.linkedin.com/company/ixswap', icon: linkedinImg },
  { href: 'https://www.youtube.com/channel/UCaYPNR-eLs9iuB5ZVKRx-fw', icon: youtubeImg },
  { href: 'https://www.coingecko.com/en/coins/ix-swap', icon: coingekoImg },
  { href: 'https://discord.gg/uHyFMyXjl', icon: discordImg },
  { href: 'https://coinmarketcap.com/currencies/ix-swap/', icon: coinmarketcapImg },
  { href: 'https://www.reddit.com/r/IXSwapOfficial/', icon: redditImg },
]

export const SocialBlock = () => {
  return (
    <SocialBlockContainer>
      <div>
        <Trans>Keep in Touch</Trans>
      </div>
      <div>
        {data.map(({ href, icon }) => (
          <ExternalLink href={href} key={href}>
            <img src={icon} alt={icon} />
          </ExternalLink>
        ))}
      </div>
    </SocialBlockContainer>
  )
}
