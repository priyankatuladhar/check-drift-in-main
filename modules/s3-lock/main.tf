provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "pri-terraform-state" {
  bucket = "pri-terraform-state-07-07-new-0707neww"
  # Tags
  tags = merge(
    var.tags,
    {
      Name      = "pri-terraform-state"
      Deletable = "Yes"
      Project   = "Intern"
      Creator   = "priyankatuladharmail@gmail.com"
    }
  )
}


resource "aws_s3_bucket_versioning" "pri-terraform-state_versioning" {
  bucket = aws_s3_bucket.pri-terraform-state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_object_lock_configuration" "pri-terraform-state_object_lock" {
  depends_on          = [aws_s3_bucket.pri-terraform-state,
                         aws_s3_bucket_versioning.pri-terraform-state_versioning
                        ]
  bucket              = aws_s3_bucket.pri-terraform-state.id
  object_lock_enabled = "Enabled"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pri-terraform-state_sse" {
  bucket = aws_s3_bucket.pri-terraform-state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}




 
