import React from "react";
import AdminLayout from "../../../hoc/admin_layout";
import AuthProfile from "./auth";
import UserProfile from "./profile";
const Profile = () => {
    return (
        <AdminLayout section="Profile">
            <AuthProfile />
            <UserProfile />
        </AdminLayout>
    )
}

export default Profile