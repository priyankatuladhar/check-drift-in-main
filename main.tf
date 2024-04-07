provider "aws" {
  region = var.region
}

terraform {
  backend "s3" {
    bucket         = "priyanka-git-bucket-04072024"  # Use the same bucket name here
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform_state_04072024"
  }
}

resource "aws_s3_bucket" "tf_backend_bucket" {
  bucket = "priyanka-git-bucket-04072024"  # Use the same bucket name here
  tags   = var.bucket_tags
}

resource "aws_s3_bucket_versioning" "tf_backend_bucket_versioning" {
  bucket = aws_s3_bucket.tf_backend_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_object_lock_configuration" "tf_backend_bucket_object_lock" {
  depends_on          = [aws_s3_bucket.tf_backend_bucket]
  bucket              = aws_s3_bucket.tf_backend_bucket.id
  object_lock_enabled = "Enabled"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf_backend_bucket_sse" {
  bucket = aws_s3_bucket.tf_backend_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

output "example_bucket_arn" {
  value = aws_s3_bucket.tf_backend_bucket.arn
}

output "bucket_id" {
  description = "The ID of the S3 bucket"
  value       = aws_s3_bucket.tf_backend_bucket.id
}
