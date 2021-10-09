import React from "react";
import {Redirect} from 'react-router-dom';

import SupplierService from "./SupplierService";

const CommonCheckAuthForSupplier = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!SupplierService.getCurrentSupplier();
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/" />;
        }
    };
    return AuthRoute;
};
export default CommonCheckAuthForSupplier;