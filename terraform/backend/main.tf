###### Configure provider ######

provider "aws" {
  version = "~> 2.45"
  region  = var.AWS_REGION
}

# You cannot create a new backend by simply defining this and then
# immediately proceeding to "terraform apply". The S3 backend must
# be bootstrapped according to the simple yet essential procedure in
# https://github.com/cloudposse/terraform-aws-tfstate-backend#usage
module "terraform_state_backend" {
  source                             = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=0.18.2"
  namespace                          = var.AWS_APP_NAME
  stage                              = var.ENVIRONMENT
  name                               = "terraform"
  attributes                         = ["state"]
  region                             = var.AWS_REGION
  terraform_backend_config_file_path = ".."
  terraform_backend_config_file_name = "backend.tf"
  force_destroy                      = true
}
