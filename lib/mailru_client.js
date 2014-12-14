Mailru = {};

Mailru.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'mailru'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.id();

    var loginUrl =
        'https://connect.mail.ru/oauth/authorize' +
            '?client_id=' + config.appId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/mailru?close=close') +
            '&response_type=code' +
            '&state=' + credentialToken;
    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
