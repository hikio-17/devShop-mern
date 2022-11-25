const userRole = "admin";

const authorizedRoles = (...roles) => {
  console.log(roles);
  if (!roles.includes(userRole)) {
    return console.log("tidak sama");
  }

  console.log("ada");
};

authorizedRoles("admin");
