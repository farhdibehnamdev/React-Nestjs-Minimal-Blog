import { createContext, useState } from "react";

interface UserUpdatedContextProps {
  userUpdated: boolean;
  setUserUpdated: (updated: boolean) => void;
}

export const UserUpdatedContext = createContext<UserUpdatedContextProps>({
  userUpdated: false,
  setUserUpdated: () => {},
});
export const UserUpdatedProvider = ({ children }: any) => {
  const [userUpdated, setUserUpdated] = useState(false);
  return (
    <UserUpdatedContext.Provider value={{ userUpdated, setUserUpdated }}>
      {children}
    </UserUpdatedContext.Provider>
  );
};
