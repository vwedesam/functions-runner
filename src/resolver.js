const { supportedServerlessProvider } = require("./constanst");

/**
 * 
 * @param {*} argv 
 * @returns 
 * @description -> trys to determine the function target, cloudprovider, and the argument structure of the provider
 * @GCP (req, res)
 * @AWS (event, context)
 */
module.exports = function(argv, rootFunction){

    let PORT = 8080;
    let functionList = null;
    let functionsCallback = null;
    let importedFunctionList  = Object.keys(rootFunction);
    let serverlessProvider = supportedServerlessProvider.GCP;

    if(argv.port){
        PORT = argv.port;
    }

    if(!argv.target && !argv.targets){
        throw new Error(`Missing --target `);
    }

    if(argv.target && argv.targets){
        throw new Error(`Can't have both --target and --targets `);
    }

    if(argv.target){
        functionList = argv.target.split(",");
    }
    
    if(argv.targets){
        functionList = argv.targets.split(",");
    }

    if(!importedFunctionList.find(_function=> functionList.includes(_function))){
        throw new Error(`Targeted function not found.`);
    }

    if(argv.provider){
        serverlessProvider = argv.provider;
        if(!Object.keys(supportedServerlessProvider).find(provider=> provider.toLowerCase() == serverlessProvider.toLowerCase())){
            throw new Error(`provider ${serverlessProvider} is not yet supported.`);
        }

        if(serverlessProvider?.toUpperCase() == supportedServerlessProvider.GCP){
            functionsCallback = function(callback){
                return callback
            }
        }else if(serverlessProvider?.toUpperCase() == supportedServerlessProvider.AWS){
            functionsCallback = function(callback){
                return function(req, res){
                    let event = req.body;
                    let context = res;
                    context.functionName = null;
                    context.invokedFunctionArn = `${req.baseUrl}`;
                    context.awsRequestId = "";
                    context.succeed = function(text){
                        return res.send(text)
                    }
                    return callback(event, context);
                }
            }
        }
    }else{
        functionsCallback = function(callback){
            return callback
        }
    }

    return {
        functionList: functionList,
        functionsCallback: functionsCallback,
        PORT: PORT
    }

}
