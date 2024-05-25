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

  export const credenttials = { 
    user,
    reset_password,
    incorrectUser,
  }