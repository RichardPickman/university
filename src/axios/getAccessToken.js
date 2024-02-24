import Cookies from 'js-cookie';

export const getAccessToken = () => {
    const accessToken = Cookies.get('refreshToken');
    const refreshToken = Cookies.get('refreshToken');

    return {
        accessToken,
        refreshToken
    }
}