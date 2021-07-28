terraform {
  required_version = ">= 0.12.2"

  backend "s3" {
    region         = "ap-southeast-1"
    bucket         = "ix-swap-web-production-terraform-state"
    key            = "terraform.tfstate"
    dynamodb_table = "ix-swap-web-production-terraform-state-lock"
    profile        = ""
    role_arn       = ""
    encrypt        = "true"
  }
}
