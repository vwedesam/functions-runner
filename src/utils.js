const { supportedServerlessProvider } = require("./constanst")

const resolveServerlessProvider = (serverlessFunction, serverlessProvider) => {

    if(serverlessProvider?.toLowerCase() == supportedServerlessProvider?.GCP.toLowerCase()){
        return serverlessFunction
    }
    else if(serverlessProvider?.toLowerCase() == supportedServerlessProvider?.AWS.toLowerCase()){
        return serverlessFunction
    }

}

module.exports = {
    resolveServerlessProvider
}