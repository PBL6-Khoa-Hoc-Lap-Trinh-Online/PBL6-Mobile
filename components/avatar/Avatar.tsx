import React from "react";
import { Image } from "react-native";

interface AvatarProps {
    avatarUrl: string;
    size?: number;
}
const Avatar = ({ avatarUrl, size = 56 }: AvatarProps) => {
    if (!avatarUrl)
        return (
            <Image
                source={require("../../assets/images/no_avatar.png")}
                style={{ width: size, height: size, objectFit: "contain" }}
                borderRadius={50}
            />
        );
    else {
        return (
            <Image
                source={{ uri: avatarUrl }}
                style={{ width: size, height: size, objectFit: "contain" }}
                borderRadius={50}
            />
        );
    }
};

export default Avatar;
