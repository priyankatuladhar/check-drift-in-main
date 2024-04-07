

terraform {
  required_version = "=1.5.0"


}

provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["/home/priyanka/.aws/credentials"]
  shared_config_files      = ["/home/priyanka/.aws/config"]

}
