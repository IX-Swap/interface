output "region" {
  description = "Deploy region"
  value       = var.AWS_REGION
}

output "s3_access_key_id" {
  description = "IAM User AccessKeyId w/ rights for the bucket"
  value       = module.s3_bucket.access_key_id
}

output "s3_secret_access_key" {
  description = "IAM User SecretAccessKey w/ rights for the bucket"
  value       = module.s3_bucket.secret_access_key
}

output "s3_user_arn" {
  description = "IAM User ARN"
  value       = module.s3_bucket.user_arn
}

output "s3_bucket_id" {
  description = "S3 bucket ID"
  value       = module.s3_bucket.bucket_id
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = module.s3_bucket.bucket_arn
}


output "cdn_arn" {
  description = "CDN ARN"
  value       = module.cdn.cf_arn
}

output "cdn_status" {
  description = "CDN Status"
  value       = module.cdn.cf_status
}

output "cdn_domain_name" {
  description = "CDN domain Name"
  value       = module.cdn.cf_domain_name
}

output "cf_id" {
  description = "CDN - ID of CloudFront distribution"
  value       = module.cdn.cf_id
}