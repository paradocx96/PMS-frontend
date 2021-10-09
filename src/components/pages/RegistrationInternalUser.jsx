import React, {Component} from 'react';
import InternalUserRegistrationSection from "../sections/Registration/InternalUserRegistration";
import NavigationAdmin from "../layouts/Navigation/NavigationAdmin";

class RegistrationInternalUser extends Component {
    render() {
        return (
            <div>
                <NavigationAdmin/>
                <InternalUserRegistrationSection/>
            </div>
        );
    }
}

export default RegistrationInternalUser;