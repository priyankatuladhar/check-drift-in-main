module "s3-lock" {
  source = "./modules/s3-lock"

}

module "db-lock" {
  source = "./modules/DB"

}

module "S3" {
  source = "./modules/s3"
}

