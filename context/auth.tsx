import { registerApi, signInApi } from "@/apis/auth";
import { getUserProfile } from "@/apis/user";
import { UserType } from "@/type/userType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useSegments } from "expo-router";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextType {
    user: UserType | null;
    refreshUser : () => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    signIn: async () => {},
    signOut: async () => {},
    signUp: async () => {},
    refreshUser: async () => {}
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
    const signIn = async (email: string, password: string) => {
        const rs = await signInApi(email, password);
        if (rs.status === 200) {
            setUser(rs.data);
            AsyncStorage.setItem("user", JSON.stringify(rs.data));
            return rs.data;
        }
    };
    const signOut = async () => {
        setUser(null);
    };
    const signUp = async (
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        await registerApi(fullName, email, password, confirmPassword);
    };
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                setUser(JSON.parse(user));
            } else {
                setUser(null);
            }
        })();
    }, []);

    const rootSegment = useSegments()[0];
    useEffect(() => {
        if (!user && rootSegment !== "(auth)") {
            router.replace("/(auth)/signIn");
        } else if (user && rootSegment !== "(app)") {
            router.replace("/(app)/");
        }
    }, [user, rootSegment]);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp,
            refreshUser: async () => {
                const newUser = await getUserProfile();
                if (newUser.status === 200) {
                    setUser(newUser.data);
                    const currentUser = await AsyncStorage.getItem("user");
                    AsyncStorage.setItem("user", JSON.stringify({
                        ...JSON.parse(currentUser ?? '{}'),
                        ...newUser.data
                    }));
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}
