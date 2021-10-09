export default function AuthHeaderSupplier() {
    const user = JSON.parse(sessionStorage.getItem('supplier'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
