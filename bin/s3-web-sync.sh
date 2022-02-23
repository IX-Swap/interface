#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Accessing working directory"
cd "$PROJECT_ROOT/" || _fail

_info "Loading .env configuration"
source $(_env_file "prod") || _fail

_info "Exporting TF_VAR_*"
declare -a ENV_VARS=( "AWS_REGION" "AWS_APP_NAME" "ENVIRONMENT" )

for _var in ${ENV_VARS[@]}; do
  echo "export ${_var}=${!_var}"
  export "${_var}=${!_var}"
done

_info "ENVIRONMENT and AWS_APP_NAME"
if [ -z "${ENVIRONMENT}" ] | [ -z "${AWS_APP_NAME}" ]; then
  _fail ' ENVIRONMENT is null !!! '
else
  _info 'Start SYNC process'
  bucket_name=$(cd terraform && terraform output s3_bucket_id) || _fail
  cloudfront_id=$(cd terraform && terraform output cf_id) || _fail
  _info "Wait SYNC files with AWS S3 Bucket / CF - ${bucket_name} / ${cloudfront_id}"
  aws s3 sync build/ s3://${bucket_name}/ --acl public-read || _fail
  _info 'Activate S3 bucket versioning'
  aws s3api put-bucket-versioning --bucket ${bucket_name} --versioning-configuration Status=Enabled || _fail
  _info 'Set index.html main document file'
  aws s3 website s3://${bucket_name}/ --index-document index.html || _fail
  _info 'invalidate cloudfront cache'
  aws cl`oudfront create-invalidation --distribution-id  ${cloudfront_id} --paths "/*"  || _fail
fi

