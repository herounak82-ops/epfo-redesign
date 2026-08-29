import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (uan: string, pass: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // For demo purposes, we can default to unauthenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (uan: string, pass: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Fake validation
    if (uan && pass) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
