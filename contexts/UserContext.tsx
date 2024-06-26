import { View, Text } from 'react-native';
import React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Role } from '../constants/constants';

export const UserContext = createContext<UserContextType | null>(null);

export type UserT = {
    name: string,
    email: string,
    phone: string
}

export type UserContextType = {
    userDetails: UserT,
    initializeData: (token: string) => Promise<void>,
    updateUserDetails: (token: string, userData: Partial<UserT>) => Promise<void>
}

type UserContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userDetails, setUser] = useState<UserT>({
        name: "",
        email: "",
        phone: "",
    });

    const initializeData = async (token: string) => {
        try {
            const response = await fetch("https://scorpion-expert-marmoset.ngrok-free.app/api/user/me", {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();

            setUser({
                name: responseData['name'],
                email: responseData['email'],
                phone: responseData['phone']
            });
        } catch (err) {
            console.log("Error while initializing data", err);
        }
    }

    const updateUserDetails = async (token: string, userData: Partial<UserT>) => {
        try {
            const response = await fetch("https://scorpion-expert-marmoset.ngrok-free.app/api/user/me/", {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            setUser({
                name: responseData['name'],
                email: responseData['email'],
                phone: responseData['phone']
            });
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    return (
        <UserContext.Provider value={{ userDetails, initializeData, updateUserDetails }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = (): UserContextType => {
    const value = useContext(UserContext);

    if (!value) {
        throw new Error("This component is not under Context Provider");
    }

    return value;
}
