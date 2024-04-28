export { fakeBackEnd };
const userKey = "Login-129078";
let users = JSON.parse(localStorage.getItem(userKey)) || [];

function fakeBackEnd() {
    let realFetch = window.fetch;
    window.fetch = function(url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 500);
            function handleRoute() {
                switch(true) {
                    case url.endsWith("/users/authenticate") && opts.method === "POST":
                    return authenticate();
                    case url.endsWith("/users/register") && opts.method === "POST":
                    return register();
                    case url.endsWith("/users") && opts.method === "GET":
                    return getUsers();
                    case url.endsWith(/\/users\/\d+$/) && opts.method === "GET":
                    return getUserById();
                    case url.endsWith(/\/users\/\d+$/) && opts.method === "PUT":
                    return updateUser();
                    case url.endsWith(/\/users\/\d+$/) && opts.method === "DELETE":
                    return deleteUser();
                    default:
                        return realFetch(url, opts).then (response => resolve(response)).catch (error => reject(error))
                }
            }              
        })
    }
}