const serverURL = process.env.REACT_APP_SERVER_URL
const defaultServerURL = 'http://localhost:3030'
export const getServerUrl = () => {
    if(serverURL) {
        console.log(`Server URL: ${serverURL}`)
        return serverURL
    }

    console.log(`REACT_APP_SERVER_URL variable not set so using default URL: ${defaultServerURL}`)
    return defaultServerURL
}