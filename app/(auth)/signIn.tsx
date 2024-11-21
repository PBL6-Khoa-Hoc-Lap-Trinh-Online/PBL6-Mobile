import Button from "@/components/button/Button";
import HorizontalRule from "@/components/horizontalRule/HorizontalRule";
import Input from "@/components/input/Input";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useAuth } from "@/context/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import {
    Facebook,
    Gift,
    Google,
    PasswordCheck,
    Personalcard,
} from "iconsax-react-native";
import React from "react";
import Toast from "react-native-toast-message";

const SignIn = () => {
    const { signIn } = useAuth();

    const [isLoading, setIsLoading] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <ThemeView>
            <ThemeText text="Welcome" type="large" />
            <ThemeText text="Back!" type="large" />
            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                icon={
                    <Personalcard size={20} color={useThemeColor({}, "icon")} />
                }
            />
            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                icon={
                    <PasswordCheck
                        size={20}
                        color={useThemeColor({}, "icon")}
                    />
                }
            />
            <Row
                justifyContent="flex-end"
                style={{
                    marginTop: 8,
                }}
            >
                <ThemeText text="Forgot password?" type="link" />
            </Row>

            <Space size={{ width: 0, height: 32 }} />

            <Button
                text="Sign in"
                loading={isLoading}
                onPress={async () => {
                    setIsLoading(true);
                    try {
                        await signIn(email, password);
                        setIsLoading(false);
                    } catch (error: any) {
                        Toast.show({
                            type: "error",
                            text1: "Warning",
                            text2: error.messages[0],
                        });
                        setIsLoading(false);
                    }
                }}
                color="primary"
            />

            <Space size={{ width: 0, height: 16 }} />

            <HorizontalRule text="OR" />

            <Space size={{ width: 0, height: 16 }} />

            <Row justifyContent="center">
                <Button
                    onPress={() => {}}
                    variant="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={
                        <Google size={20} color={useThemeColor({}, "text")} />
                    }
                />
                <Space size={{ width: 8, height: 0 }} />
                <Button
                    onPress={() => {}}
                    variant="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={
                        <Facebook size={20} color={useThemeColor({}, "text")} />
                    }
                />
                <Space size={{ width: 8, height: 0 }} />
                <Button
                    onPress={() => {}}
                    variant="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={<Gift size={20} color={useThemeColor({}, "text")} />}
                />
            </Row>

            <Space size={{ width: 0, height: 16 }} />

            <Row justifyContent="center">
                <ThemeText text="Don't have an account?" type="small" />
                <Space size={{ width: 4, height: 0 }} />
                <ThemeText
                    text="Sign up"
                    type="link"
                    onPress={() => {
                        router.navigate("/(auth)/signUp");
                    }}
                />
            </Row>
        </ThemeView>
    );
};

export default SignIn;
