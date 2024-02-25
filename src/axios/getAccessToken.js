
export const getAccessToken = () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const refreshToken = window.localStorage.getItem('refreshToken');

    return {
        accessToken,
        refreshToken
    }
}