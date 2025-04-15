import { useContext } from "react";
import {AuthContext} from "../AuthContext";

//hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;