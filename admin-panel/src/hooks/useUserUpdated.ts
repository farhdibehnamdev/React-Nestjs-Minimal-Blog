import { useContext } from "react";
import { UserUpdatedContext } from "src/context/UserUpdatedContext";

export const useUserUpdated = () => {
  const context = useContext(UserUpdatedContext);
  if (!context) {
    throw new Error("useUserUpdated must be used within a UserUpdatedProvider");
  }
  return context;
};
