'use client'
// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies  from 'universal-cookie';
import { useRouter } from 'next/navigation';

interface Auth {
    isLogged:boolean,
    isAdmin:boolean,
    login:(token:string,isAdmin:boolean)=>void,
    register:(token:string,isAdmin:boolean)=>void,
    logout:()=>void,
}
const AuthContext = createContext<Auth | undefined>(undefined)

export const AuthProvider = ({ children }:{children:any}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const cookies = new Cookies()
  const router = useRouter()
  useEffect(() => {
    const token = cookies.get('jwt_token')
    const isAdmin = cookies.get('is_admin')
    setIsLogged(!!token);
    setIsAdmin(isAdmin);
  }, []);

  const login = (token:string,isAdmin:boolean) => {
    cookies.set("jwt_token",token,{path:"/"})
    cookies.set("is_admin",isAdmin,{path:"/"})
    setIsLogged(true);
    setIsAdmin(isAdmin);
    router.push("/")
  };
  const register = (token:string,isAdmin:boolean) => {
    cookies.set("jwt_token",token,{path:"/"})
    cookies.set("is_admin",isAdmin,{path:"/"})
    setIsLogged(true);
    setIsAdmin(isAdmin);
    router.push("/")
  };
  const logout = () => {
    cookies.remove("jwt_token",{path:"/"})
    cookies.remove("is_admin",{path:"/"})
    setIsLogged(false);
    setIsAdmin(false);
    router.push("/")
    router.refresh()
  };
  return (
    <AuthContext.Provider value={{ isLogged, login, register, isAdmin,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);