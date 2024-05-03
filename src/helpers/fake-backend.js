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
            function authenticate() {
                const {username, password} = body();
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error ("User or password incorrect");
                return ok({
                    ...basicDetails(user),
                    token: "fake-jwt-token"
                });
            } 
            function register() {
                const user = body();
                if (users.find(x => x.username === user.username )) {
                    return error("username" + user.username + "cant be used")
                }
                user.id = users.length? Math.max(...users.map(x => x.id)) + 1:1;
                users.push(user);
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            } 
            function getUsers() {
                if (!isauthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }  
            function getUserById() {
                if (!isauthenticated()) return unauthorized();
                const user = users.find(x => x.id === idfromurl());
                return ok(basicDetails(user));
            }
            function updateUser() {
                if (!isauthenticated()) return unauthorized();
                let params = body();
                let user = users.find(x => x.id === idfromurl());
                if (!params.password) {
                    delete params.password;
                }
                if (params.username === user.username && users.find(x => x.username === params.username)) {
                    return error('username' + params.username + ' is already in use');
                }
                Object.assign(user, params);
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            function deleteUser() {
                if (!isauthenticated()) return unauthorized();
                users = users.filter(x => x.id !== idfromurl());
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            function ok(body) {
                resolve({
                    ok: true,
                    ...headers(),
                    json: () => Promise.resolve(body)          
                })
            }
            function isauthenticated() {
                return opts.headers["Authorization"] === "Bearer fake-jwt-token";
            } 
            function unauthorized() {
                resolve({
                    status: 401,
                    ...headers(),
                    json: () => Promise.resolve({
                        message: "unauthorized"
                    })
                })
            }
            function error(message) {
                resolve({
                    status: 400,
                    ...headers(),
                    json: () => Promise.resolve({
                        message
                    })
                }) 
            }
            function body() {
                return opts.body && JSON.parse(opts.body);
            }
            function idfromurl() {
                const urlparts = url.split('/');
                return parseInt(urlparts[urlparts.length - 1])
            }
            function basicDetails(user) {
                const {id, username} = user;
                return {id, username};
            }
            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ["application/json"]
                        }
                    }
                }
            }
        });
    }
}