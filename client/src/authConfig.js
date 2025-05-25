import { LogLevel } from "@azure/msal-browser";


export const msalConfig = {
    auth: {
        clientId:  "9bb35b68-1f25-45b3-a649-506c02de0bcf",
        authority: "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};


export const loginRequest = {
    scopes: ["User.Read"]
};


export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
