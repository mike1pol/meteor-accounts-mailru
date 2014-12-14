Template.configureLoginServiceDialogForMailru.siteUrl = function () {
    return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForMailru.fields = function () {
    return [
        {property: 'appId',  label: 'App Id'},
        {property: 'secret', label: 'App Secret'}
    ];
};