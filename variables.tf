variable "bucket_name_prefix" {
  description = "Prefix for the S3 bucket name"
  type        = string
  default     = "my-example-bucket-for-drift040424"
}

variable "bucket_acl" {
  description = "Access control for the S3 bucket"
  type        = string
  default     = "private"
}

variable "bucket_tags" {
  description = "Tags for the S3 bucket"
  type        = map(string)
  default     = {
    Name        = "priyanka buckte"
    Environment = "Development"
    Creator     = "priyankatuladharmail@gmail.com"
    Deletable   = "Yes"
    Project     = "Intern"
  }
}
