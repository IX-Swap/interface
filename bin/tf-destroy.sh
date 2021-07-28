#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Accessing working directory"
cd "$PROJECT_ROOT" || _fail

_info "Loading .env configuration"
source $(_env_file "prod") || _fail

_info "Exporting TF_VAR_*"
declare -a ENV_VARS=( "AWS_REGION" "AWS_AZS" "AWS_ACM_ARN" "AWS_APP_NAME"  "ENVIRONMENT" "VERSION" )

for _var in ${ENV_VARS[@]}; do
  echo "export TF_VAR_${_var}=${!_var}"
  export "TF_VAR_${_var}=${!_var}"
done

# Special dase for db name...
# TODO: use a generic way...

_info "Accessing terraform working directory"
cd "$PROJECT_ROOT/terraform" || _fail

_info "Destroy infrastructure"
if [ "$AWS_APPLY_CONFIRM" == "true" ]; then
  terraform destroy || _fail
else
  terraform destroy -auto-approve || _fail
fi

_info "Remove terraform backend configuration"
rm backend.tf || _fail

_info "Destroy backend infrastructure"
cd backend || _fail
if [ "$AWS_APPLY_CONFIRM" == "true" ]; then
  terraform destroy || _fail
else
  terraform destroy -auto-approve || _fail
fi

_info "Accessing working directory"
cd "$PROJECT_ROOT/" || _fail
