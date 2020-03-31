
yarn build
aws s3 sync ./build/ s3://app.mozork.com --delete