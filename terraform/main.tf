###### Configure provider ######

provider "aws" {
  version = "~> 2.45"
  region  = var.AWS_REGION
}
