#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Accessing working directory"
cd "$PROJECT_ROOT" || _fail

_info "Loading .env configuration"
source $(_env_file "prod") || _fail

_info "Exporting TF_VAR_*"
declare -a ENV_VARS=( "AWS_REGION" "AWS_AZS" "AWS_ACM_ARN" "AWS_APP_NAME" "ENVIRONMENT" "VERSION" )

for _var in ${ENV_VARS[@]}; do
  echo "export TF_VAR_${_var}=${!_var}"
  export "TF_VAR_${_var}=${!_var}"
done

# Special dase for db name...
# TODO: use a generic way...

_info "Accessing terraform working directory"
cd "$PROJECT_ROOT/terraform" || _fail

_info "Create SSM Parameter Store node-env/$ENVIRONMENT/$AWS_APP_NAME to keep env vars. Update variables manually!!!"
_create_ssm_env_vars  || _fail

_info "Provision infrastructure"
if [[ $1 == "plan" ]]; then
  _info "terraform $1"
  terraform $1 || _fail
else
  _info "terraform apply"
#   terraform apply -auto-approve || _fail
fi

