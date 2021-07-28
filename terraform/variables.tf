variable "AWS_REGION" {
  description = "Deploy region"
  default = "ap-southeast-1"
}

variable "AWS_AZS" {
  type        = list
  description = "List of availability zones"
}

variable "AWS_APP_NAME" {
  description = "Application name"
  default     = "IX-Swap-Web"
}

variable "AWS_APP_DOMAIN" {
  description = "Application name"
  default     = "app.ixswap.io"
}

variable "AWS_APP_PARENT_ZONE" {
  description = "Application name"
  default     = "ixswap.io"
}
variable "AWS_ACM_ID" {
  description = "AWS ACM public certificate identifier"
  default     = "arn:aws:acm:ap-southeast-1:234891136725:certificate/95966674-38b3-4c14-86f3-c532c35c2ca2"
}

variable "AWS_ACM_ARN" {
  description = "AWS ACM public certificate identifier"
  default     = "arn:aws:acm:us-east-1:234891136725:certificate/37240f9d-1d25-4071-981a-dd1378647cb6"
}

variable "ENVIRONMENT" {
  description = "Environment name"
  default     = "production"
}

variable "VERSION" {
  description = "Active API version"
  default     = "v1"
}

################## HARDCODED ##################

variable "HEALTH_PATH" {
  description = "Path for healthchecks"
  default     = "/health"
}
