/**
 * Created by Ricci on 19/07/2016.
 */
function login() {
    return ajax('http://localhost:8080/login', {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        body: 'username='.concat(config.username).concat('&password=').concat(
            config.password)
    });
}