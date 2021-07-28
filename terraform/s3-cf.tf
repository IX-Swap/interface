module "s3_bucket" {
  source                                 = "git::https://github.com/cloudposse/terraform-aws-s3-bucket.git?ref=0.20.0"
  name                                   = var.AWS_APP_NAME
  stage                                  = var.ENVIRONMENT
  namespace                              = "s3"
  enabled                                = true
  user_enabled                           = false
  restrict_public_buckets                = false
  block_public_acls                      = false
  block_public_policy                    = false
  force_destroy                          = true
  versioning_enabled                     = true
  abort_incomplete_multipart_upload_days = 2
  acl                                    = "public-read"
  tags = {
    Project     = var.AWS_APP_NAME
    Environment = var.ENVIRONMENT
  }
}

module "cdn" {
  source              = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=0.20.0"
  namespace           = "s3"
  stage               = var.ENVIRONMENT
  name                = var.AWS_APP_NAME
  origin_bucket       = "s3-${var.ENVIRONMENT}-${var.AWS_APP_NAME}"
  aliases             = ["${var.AWS_APP_DOMAIN}","www.${var.AWS_APP_DOMAIN}"]
  parent_zone_name    = "${var.AWS_APP_PARENT_ZONE}"
  acm_certificate_arn = "${var.AWS_ACM_ARN}"
  tags = {
    Project     = var.AWS_APP_NAME
    Environment = var.ENVIRONMENT
  }
}

