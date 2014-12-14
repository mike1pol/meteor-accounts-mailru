Package.describe({
    summary: "Login service for My World mail.ru accounts (https://my.mail.ru)",
    version: "0.1.0",
    git: "https://github.com/mike1pol/meteor-accounts-mailru.git",
    name: "mikepol:accounts-mailru"
});

Package.on_use(function(api) {
    api.versionsFrom('METEOR@0.9.0');
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.imply('accounts-oauth', ['client', 'server']);

    api.use('jparker:crypto-md5@0.1.1', ['server']);

    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);
    api.use('templating', 'client');

    api.add_files("lib/accounts_mailru.js");
    api.add_files('lib/mailru_client.js', 'client');
    api.add_files('lib/mailru_server.js', 'server');

    api.export('Mailru');

    api.add_files(['lib/mailru_configure.html', 'lib/mailru_configure.js', 'lib/mailru_styles.css'], 'client');

});
