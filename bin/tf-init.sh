#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Loading .env configuration"
source $(_env_file "prod") || _fail

_info "Exporting TF_VAR_*"
declare -a ENV_VARS=( "AWS_REGION" "AWS_APP_NAME" "ENVIRONMENT" )

for _var in ${ENV_VARS[@]}; do
  echo "export TF_VAR_${_var}=${!_var}"
  export "TF_VAR_${_var}=${!_var}"
done

_info "Accessing terraform working directory"
cd "$PROJECT_ROOT/terraform" || _fail

_info "Initialize terraform backend"
cd backend || _fail
terraform init || _fail

_info "Provision backend infrastructure"
if [ -z "$CI" ]; then
  terraform apply -auto-approve || _fail
else
  echo "Skipping on a CI env..."
fi

_info "Initialize terraform"
cd .. || _fail
terraform init || _fail
