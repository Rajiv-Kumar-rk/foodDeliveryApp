import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, confirmPassword: string, role: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTokens = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        await verifyTokens(accessToken, refreshToken);
      }
      setIsLoading(false);
    };
    loadTokens();
  }, []);

  const verifyTokens = async (accessToken: string, refreshToken: string) => {
    try {
        console.log("tokens received in verifyTokens: ", accessToken, refreshToken)
      // First, try to use the access token
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        console.log("verifyToken: ", data)
        const userData:User = {
            id: data?._id, 
            email: data?.email, 
            name: `${data?.firstName} ${data?.lastName}`,
            avatar: data?.avatar,
        };
        setUser(userData);
      } else {
        // If access token is invalid, try to refresh
        await refreshAccessToken(refreshToken);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      setUser(null);
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { data} = await response.json();
        console.log("refreshAccessToken: ", data);
        await AsyncStorage.setItem('accessToken', data?.accessToken);
        await AsyncStorage.setItem('refreshToken', data?.refreshToken);
        // setUser(user);
        await verifyTokens(data?.accessToken, data?.refreshToken);
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("-----login-----", `${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/login`)
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("----aftr res----")
      if (response.ok) {
        const { data } = await response.json();
        

        await AsyncStorage.setItem('accessToken', data?.accessToken);
        await AsyncStorage.setItem('refreshToken', data?.refreshToken);
        console.log("login: ", data);
        const userData:User = {
            id: data?.user?._id, 
            email: data?.user.email, 
            name: `${data?.user?.firstName} ${data?.user?.lastName}`,
            avatar: data?.user?.avatar,
        };
        setUser(userData);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, confirmPassword: string, role: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword, role }),
        // TODO
      });
      if (response.ok) {
        const { data } = await response.json();
        await login(email, password);
        // await AsyncStorage.setItem('accessToken', accessToken);
        // await AsyncStorage.setItem('refreshToken', refreshToken);
        // setUser(user);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        // Optionally invalidate the refresh token on the server
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_PREFIX_URL}/users/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        //   body: JSON.stringify({ accessToken }),
        });

        if (response.ok) {
            const { data } = await response.json();
            console.log("logout: ", data);
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            setUser(null);
            console.log("----aftr lout state chnage---")
        } else {
            throw new Error("Failed to logout");
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } 
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

