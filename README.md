meteor-accounts-mailru
==================

Login service for My World mail.ru accounts (https://my.mail.ru).

Usage
-----

1. Add the package to your project using meteorite:
```sh
$ meteor add mikepol:accounts-mailru
```

2. Configure Mailru login service. You can do mannually or using GUI.

    **Manually**: Just add next code to your config file.
    ```js
        if (Meteor.isServer) {
            ServiceConfiguration.configurations.remove({
                service: 'mailru'
            });

            ServiceConfiguration.configurations.insert({
                service: 'mailru',
                appId:   '1234567',       // Your app id
                secret:  'someappsecret', // Your app secret
                public:  'someapppublic', // Your app public code
            });
        }
    ```

    **GUI**: 
    * Add `accounts-ui` package to your project:

        ```sh
        $ meteor add accounts-ui
        ```
    * Set `{{> loginButtons}}` into your template
    * Go to your browser, open page with `{{> loginButtons}}`
    * Click on "configure Mailru login" button
    * Fill "App Id", "App Secret" and "App Public" fields in popup window following by instructions

3. Use `Meteor.loginWithMailru(options, callback)` for user authentication (you can omit `options` argument).

4. For customization of new user creation you must set 'createUser' event handler:
```js
    if (Meteor.isServer) {
        Accounts.onCreateUser(function(options, user) {
            user.custom_field = "custom value";
            // ...
            return user;
        });
    }
```

Dependencies
------------

1. **accounts-base**
2. **accounts-oauth**
3. **jparker:crypto-md5**
4. **accounts-ui** (if you want to use GUI)
