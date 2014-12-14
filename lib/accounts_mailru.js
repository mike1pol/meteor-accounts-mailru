Accounts.oauth.registerService('mailru');

if (Meteor.isClient) {
    Meteor.loginWithMailru = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Mailru.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.mailru'],
        forOtherUsers: [
            'services.mailru.id',
            'services.mailru.nickname',
            'services.mailru.gender'
        ]
    });
}
