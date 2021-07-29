#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Accessing working directory"
cd "$PROJECT_ROOT/" || _fail

if [ -z "${ENVIRONMENT}" ] | [ -z "${AWS_APP_NAME}" ]; then
  _info "Check .env file"
  if [ -f .env ]; then
    source .env
  fi
fi

_info "ENVIRONMENT and AWS_APP_NAME"
if [ -z "${ENVIRONMENT}" ] | [ -z "${AWS_APP_NAME}" ]; then
  _fail ' ENVIRONMENT is null !!! '
else
  _info 'Wait SYNC files with AWS S3 Bucket'
  aws s3 sync build/ s3://s3-${ENVIRONMENT}-${AWS_APP_NAME}/ --acl public-read || _fail
  _info 'Activate S3 bucket versioning'
  aws s3api put-bucket-versioning --bucket s3-${ENVIRONMENT}-${AWS_APP_NAME} --versioning-configuration Status=Enabled || _fail
  _info 'Set index.html main document file'
  aws s3 website s3://s3-${ENVIRONMENT}-${AWS_APP_NAME}/ --index-document index.html || _fail
  _info 'invalidate cloudfront cache'
  aws cloudfront create-invalidation --distribution-id $(cd terraform && terraform output cf_id) --paths "/*"  || _fail
fi
