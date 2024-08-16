
require('dotenv').config({
  path: `/Users/seanghak/Desktop/Project/SB_POB/softbank_POB/sb-pob/.env`
});

const user = {
  tenant_id: process.env.USER_TENANT_ID,
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};

const facebook = {
  facebook_email: process.env.FACEBOOK_USER_EMAIL,
  facebook_password: process.env.FACEBOOK_USER_PASSWORD,
}

const reset_password = {
  currentPassword: process.env.RESET_PASSWORD_CURRENT,
  newPassword: process.env.RESET_PASSWORD_NEW,
};

const incorrectUser = {
  tenant_id: process.env.INCORRECT_USER_TENANT_ID,
  email: process.env.INCORRECT_USER_EMAIL,
  password: process.env.INCORRECT_USER_PASSWORD,
};

const login_url = process.env.LOGIN_URL;
const toppage_url = process.env.TOPPAGE_URL;

const credentials = { 
  user,
  reset_password,
  incorrectUser,
  login_url,
  toppage_url,
  facebook,
};

module.exports = { 
  credentials,
  user,
  reset_password,
  incorrectUser,
  toppage_url,
  login_url,
  facebook,
}