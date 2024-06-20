// credentials.js
const user = {
  tenant_id: "takeshiba_001",
  email: "admin@sb-disaster-admin-pob.tagcast.group",
  password: "Abc12345678901",
};

const reset_password = {
  currentPassword: "Abc12345678901",
  newPassword: "Abc123456789012",
};

const incorrectUser = {
  tenant_id: "takeshiba",
  email: "admin@sb-disaster-admin-pob",
  password: "Abc12345678",
};

const login_url = "https://sb-disaster-admin-pob.tagcast.group/login";
const toppage_url = "https://sb-disaster-admin-pob.tagcast.group/message-deliveries";

export const credentials = { 
  user,
  reset_password,
  incorrectUser,
  login_url,
  toppage_url,
};

export {user,reset_password,incorrectUser,toppage_url,login_url};