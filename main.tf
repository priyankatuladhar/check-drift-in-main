provider "aws" {
  region = "us-west-1"
}

resource "aws_s3_bucket" "example_bucket" {
  bucket_prefix = var.bucket_name_prefix
  acl           = var.bucket_acl

  tags = var.bucket_tags
}
