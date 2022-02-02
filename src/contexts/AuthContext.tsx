import { createContext, useEffect, useState } from "react";
import Router from 'next/router'
import { recoverUserInformation, signInRequest } from "../services/auth";
import { setCookie, parseCookies } from 'nookies'
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'next-auth-jwt.token': token } = parseCookies()

    if (token) {
      recoverUserInformation()
        .then(response => setUser(response.user))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({ email, password })

    setCookie(undefined, 'next-auth-jwt.token', token, {
      maxAge: 60 * 60 * 1, // 1 Hora
    })

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(user)

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}