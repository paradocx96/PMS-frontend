export default function AuthHeaderInternalUser() {
    const user = JSON.parse(sessionStorage.getItem('internalUser'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}