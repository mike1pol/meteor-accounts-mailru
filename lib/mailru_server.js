Mailru = {};

Oauth.registerService('mailru', 2, null, function(query) {
    var response    = getTokenResponse(query);
    var identity    = getIdentity(response.accessToken);

    var serviceData = {
        id: response.id,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: (+new Date) + response.expires
    };

    delete serviceData.uid;

    _.extend(serviceData, identity);

    return {
        serviceData: serviceData
    };
});

// returns an object containing:
// - accessToken
// - refreshToken
// - expires
// - id
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'mailru'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    var responseContent;

    try {
        // Request an access token
        responseContent = HTTP.post(
            "https://connect.mail.ru/oauth/token", {
                params: {
                    client_id:     config.appId,
                    client_secret: config.secret,
                    grant_type:    'authorization_code',
                    code:          query.code,
                    redirect_uri:  Meteor.absoluteUrl('_oauth/mailru?close=close')

                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Mailru. " + err.message),
            {response: err.response});
    }


    var parsedResponse = JSON.parse(responseContent);

    if (!parsedResponse.access_token) {
        throw new Error("Failed to complete OAuth handshake with Mailru " +
            "-- can't find access token in HTTP response. " + responseContent);
    }
    return {
        accessToken: parsedResponse.access_token,
        refreshToken: parsedResponse.refresh_token,
        expires: parsedResponse.expires_in,
        id: parsedResponse.x_mailru_vid
    };
};

var getIdentity = function (accessToken) {
    var config = ServiceConfiguration.configurations.findOne({service: 'mailru'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }
    var sig = CryptoJS.MD5('app_id=' + config.appId + 'method=users.getInfosecure=1session_key=' + accessToken + config.secret).toString();
    var result = HTTP.get(
        "http://www.appsmail.ru/platform/api", {params: {
            app_id: config.appId,
            method: 'users.getInfo',
            secure: 1,
            session_key: accessToken,
            sig: sig
        }});
    if (result.error) // if the http response was an error
        throw new Meteor.Error(result.error);
    return result.data[0];
};

Mailru.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
