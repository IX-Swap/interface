#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

function _info() {
  echo ""
  echo " ===> $1"
  echo ""
}

function _fail() {
  if [ ! -z "$1" ]; then
    echo "$1" 1>&2
  fi
  exit 1
}

SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

_info "Accessing working directory"
cd "$PROJECT_ROOT/" || _fail

_info "Loading .env configuration"
if [ $CI != "true"  ]; then
  source $(_env_file "prod") || _fail
fi

_info "Exporting TF_VAR_*"
declare -a ENV_VARS=( "AWS_REGION" "AWS_APP_NAME" "ENVIRONMENT" )

for _var in ${ENV_VARS[@]}; do
  echo "export ${_var}=${!_var}"
  export "${_var}=${!_var}"
done

if [ $CI == "true" ] && [ ! -z "$AWS_APP_NAME" ] && [ ! -z $ENVIRONMENT ] && [ ! -z $AWS_REGION ]; then
  _info "Get AWS parameter store /node-env/$ENVIRONMENT/$AWS_APP_NAME and create .env file"
  aws ssm get-parameter --name "/node-env/$ENVIRONMENT/$AWS_APP_NAME" --with-decryption | jq -r ".Parameter.Value" > .env || _fail
  cat .env | grep "REACT.*.URL\|ENV\|_NAME\|DEVOPS"
else
  _info "One or more Variables not defined: CI=$CI AWS_REGION=$AWS_REGION AWS_APP_NAME=$AWS_APP_NAME ENVIRONMENT=$ENVIRONMENT"
fi
