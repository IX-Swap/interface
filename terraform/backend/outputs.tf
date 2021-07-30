output "state_bucket" {
  description = "ARN of the S3 bucket the state is stored"
  value       = module.terraform_state_backend.s3_bucket_arn
}
