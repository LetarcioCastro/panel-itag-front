import { createContext, useContext } from "react";

export const AccountContext = createContext<{ account: any }>({ account: null })
export const useAccountContext = () => useContext(AccountContext)
