import { View, Text } from "react-native";
import React from "react";
import ThemeView from "@/components/themeView/ThemeView";
import Button from "@/components/button/Button";
import { useAuth } from "@/context/auth";
import Row from "@/components/row/Row";
import Avatar from "@/components/avatar/Avatar";
import ThemeText from "@/components/themeText/ThemeText";
import Space from "@/components/space/Space";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import SettingCard from "@/components/settingCard/SettingCard";
import {
    CalendarEdit,
    Card,
    Map,
    Map1,
    Personalcard,
} from "iconsax-react-native";
import { FlatList } from "react-native-gesture-handler";

const Account = () => {
    const { signOut } = useAuth();

    const { user, refreshUser } = useAuth();

    return (
        <ThemeView>
            <Row justifyContent="flex-start">
                <Avatar avatarUrl={user?.user_avatar ?? ""} />
                <View
                    style={{
                        marginLeft: 16,
                    }}
                >
                    <ThemeText type="title">{user?.user_fullname}</ThemeText>
                    <ThemeText type="medium" text={user?.email} />
                </View>
            </Row>
            <Space size={{ height: 16, width: 0 }} />
            <View
                style={{
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    padding: 16,
                    borderRadius: 8,
                }}
            >
                <ThemeText type="title">Account</ThemeText>
                <Space size={{ height: 8, width: 0 }} />
                <Row
                    style={{
                        width: "100%",
                    }}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <View style={{ width: "33%" }}>
                        <SettingCard
                            icon={
                                <Personalcard
                                    size={36}
                                    color={useThemeColor({}, "icon")}
                                />
                            }
                            title="Personal Information"
                            onPress={() => {
                                router.navigate(
                                    "/(app)/personalInfo/PersonalInfomation"
                                );
                            }}
                            style={{ width: "100%" }}
                        />
                    </View>
                    <View style={{ width: "33%" }}>
                        <SettingCard
                            icon={
                                <Map1
                                    size={36}
                                    color={useThemeColor({}, "icon")}
                                />
                            }
                            title="Address Book"
                            onPress={() => {
                                router.navigate(
                                    "/(app)/addressBook/AddressBook"
                                );
                            }}
                            style={{ width: "100%" }}
                        />
                    </View>
                    <View style={{ width: "33%" }}>
                        <SettingCard
                            icon={
                                <Card
                                    size={36}
                                    color={useThemeColor({}, "icon")}
                                />
                            }
                            title="Credit Card Information"
                            onPress={() => {}}
                            style={{ width: "100%" }}
                        />
                    </View>
                </Row>
            </View>
            <Space size={{ height: 16, width: 0 }} />
            <Button
                color="primary"
                onPress={() => {
                    signOut();
                }}
                text="Sign out"
            />
        </ThemeView>
    );
};

export default Account;
