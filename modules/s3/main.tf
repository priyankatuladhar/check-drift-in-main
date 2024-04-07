provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "default" {
  bucket = "pri-test-bucket-ops-0707"

  # Tags
  tags = merge(
    var.tags,
    {
      Name      = "priyanka-lf-test-s3-bucket"
      Deletable = "Yes",
      Project   = "Intern",
      Creator   = "priyankatuladhar@gmail.com",
    }
  )
}


resource "aws_s3_object" "object" {
  bucket = aws_s3_bucket.default.id
  key    = each.value

  content_type = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "json" = "application/json",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "jpeg" = "image/jpeg",
    "svg"  = "image/svg+xml"
  }, element(split(".", basename(each.value)), length(split(".", basename(each.value))) - 1), "binary/octet-stream")

  for_each = fileset("../dist", "**/*")

  source = "../dist/${each.value}"
}
