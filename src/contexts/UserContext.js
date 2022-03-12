import React, { createContext, useContext, useReducer } from "react";
import userReducer from "../functions/reducers/userReducer";

const UserContext = createContext();

function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [{ userId, userName, email, userToken }, userDispatch] = useReducer(
    userReducer,
    {
      userId: null,
      userId: null,
      userName: null,
      email: null,
      userToken: null,
    }
  );

  return (
    <UserContext.Provider
      value={{ userId, userName, email, userToken, userDispatch }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
