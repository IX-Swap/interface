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

import { SocialBlockContainer } from './styleds'

const data = [
  { href: 'https://t.me/ixswapofficial', Icon: telegramImg },
  { href: 'https://twitter.com/IxSwap', Icon: twitterImg },
  { href: 'https://www.linkedin.com/company/ixswap', Icon: linkedinImg },
  { href: 'https://www.youtube.com/channel/UCaYPNR-eLs9iuB5ZVKRx-fw', Icon: youtubeImg },
  { href: 'https://www.coingecko.com/en/coins/ix-swap', Icon: coingekoImg },
  { href: 'https://discord.gg/uHyFMyXjl', Icon: discordImg },
  { href: 'https://coinmarketcap.com/currencies/ix-swap/', Icon: coinmarketcapImg },
  { href: 'https://www.reddit.com/r/IXSwapOfficial/', Icon: redditImg },
]

export const SocialBlock = () => {
  return (
    <SocialBlockContainer>
      <div>
        <Trans>Keep in Touch</Trans>
      </div>
      <div>
        {data.map(({ href, Icon }) => (
          <ExternalLink href={href} key={href}>
            <Icon />
          </ExternalLink>
        ))}
      </div>
    </SocialBlockContainer>
  )
}
