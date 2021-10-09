import React from "react";
import {Redirect} from 'react-router-dom';

import InternalUserService from "./InternalUserService";

const CommonCheckAuthForInternalUsers = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!InternalUserService.getCurrentInternalUser();
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/" />;
        }
    };
    return AuthRoute;
};
export default CommonCheckAuthForInternalUsers;