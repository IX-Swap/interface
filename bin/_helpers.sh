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

function _urlencode() {
  local data
  if [[ $# != 1 ]]; then
      echo "Usage: $0 string-to-urlencode"
      return 1
  fi
  data="$(curl -s -o /dev/null -w %{url_effective} --get --data-urlencode "$1" "")"
  if [[ $? != 3 ]]; then
      echo "Unexpected error" 1>&2
      return 2
  fi
  echo "${data##/?}"
  return 0
}

function _env_file() {
  local _efile="$PROJECT_ROOT/.env.$1"

  if [ -f "$_efile" ]; then
    echo "$_efile"
  else
    echo "$PROJECT_ROOT/.env"
  fi
}

function _to_lower()  {
  echo "$1" | awk '{ print tolower($1) }'
}

function _human_yes_no() {
  [ "$1" == 1 ] && echo 'Yes' || echo 'No'
}

function _yes_no_prompt() {
  while true; do
    read -p ">> $1? [Y/N] " yn
    case $yn in
        [Yy]* ) return 1;;
        [Nn]* ) return 0;;
        * ) echo "Please answer yes (Y) or no (N).";;
    esac
  done
}

function _create_ssm_env_vars() {
  if [[ -f "$PROJECT_ROOT/.env.$ENVIRONMENT2" ]]; then
    file="$PROJECT_ROOT/.env.$ENVIRONMENT"
  else
    file="$PROJECT_ROOT/.env"
  fi
  aws ssm get-parameters --name "/node-env/$ENVIRONMENT/$AWS_APP_NAME" \
                        --with-decryption | jq -r ".Parameters[]" | jq -r ".Name" | grep "node-env/$ENVIRONMENT/$AWS_APP_NAME" ||
  aws ssm put-parameter --name "/node-env/$ENVIRONMENT/$AWS_APP_NAME" \
                        --type "SecureString" \
                        --value "$(cat $file)"
}