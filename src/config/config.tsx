let config = {
    appName: "AT Management",
    siteUrl: "https://www.bhavikg.fyi/api",
    apiUrl: "https://www.bhavikg.fyi/api",
    getIpAddressUrl: 'https://api-bdc.net/data/client-ip',
    environment: "development",
};
console.log("********************************")
console.log(process.env.REACT_APP_SITE_DEPLOYMENT_MODE);
console.log("********************************")
if (process.env.REACT_APP_SITE_DEPLOYMENT_MODE === "production") {
    config = {
        ...config,
        siteUrl: "https://agreemtechnologies.com/public/api",
        apiUrl: "https://agreemtechnologies.com/public/api",
        getIpAddressUrl: 'https://api-bdc.net/data/client-ip',
        environment: "production",
    };
} else {
    config = {
        ...config,
        environment: "development",
    };
}

export default config;
