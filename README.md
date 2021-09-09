# IXswap Interface

[![RELEASE - AWS build & deploy](https://github.com/IX-Swap/interface/actions/workflows/release.yaml/badge.svg?branch=main)](https://github.com/IX-Swap/interface/actions/workflows/release.yaml) 
[![Unit Tests](https://github.com/IX-Swap/interface/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/IX-Swap/interface/actions/workflows/unit-tests.yaml)
[![Integration Tests](https://github.com/IX-Swap/interface/actions/workflows/integration-tests.yaml/badge.svg)](https://github.com/IX-Swap/interface/actions/workflows/integration-tests.yaml)
---------------------------------------------------------------------------------------------------------------------------
- Website: [ixswap.io](https://ixswap.io)
- Interface: [app.ixswap.io](https://app.ixswap.io)
- Telegram: [ixswapofficial](https://t.me/ixswapofficial)
- Twitter: [@IxSwap](https://twitter.com/IxSwap)
- Linkedin: [IX Swap](https://www.linkedin.com/company/ixswap)
- Mediun: [IX Swap](https://ixswap.medium.com/)

## Accessing IXswap

The IXswap App supports swapping, adding liquidity, removing liquidity.

- Swap on IXswap: https://app.ixswap.io/#/swap
- View IXswap liquidity: https://app.ixswap.io/#/pool
- Add Liquidity: https://app.ixswap.io/#/add

## *(FIRST DEPLOY)*  Provision your infrastructure using `terraform`
```bash
cat <<-EOF >> .env
VERSION=v1
ENVIRONMENT=production
WEBSITE_NAME='IX-Swap-Web'
AWS_REGION=ap-southeast-1
AWS_APP_NAME=ix-swap-web
AWS_APPLY_CONFIRM=true
AWS_AZS='["ap-southeast-1a", "ap-southeast-1b"]'
#AWS_ACM_ARN=''
EOF
# Configure AWS CLI
aws configure 
# Initialize terraform (s3 bucket for tf.status, plugins, modules etc)
./bin/tf-init.sh 
# Apply infrastructure terraform scripts 
./bin/tf-apply.sh
```
###### Sync existent s3-bucket 
```bash
aws s3 sync ./build/ s3://<s3-buket-name>/ --acl public-read
aws s3 website s3://<s3-buket-name/ --index-document index.html
```