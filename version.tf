# resource "aws_s3_bucket_server_side_encryption_configuration" "tf_backend_bucket_sse" {
#   bucket = aws_s3_bucket.tf_backend_bucket.id
#   rule {
#     apply_server_side_encryption_by_default {
#       sse_algorithm = "aws:kms"
#     }
#   }
# }