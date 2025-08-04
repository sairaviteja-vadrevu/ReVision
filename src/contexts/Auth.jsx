import { useState } from "react";
import AuthContext from "constants/AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const values = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
