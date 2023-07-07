export function Menu(name, time) {
    this.name = name;
    this.time = time;
}

export function Chef(name) {
    this.name = name;
    this.status = "ready";
}
Chef.prototype.isAvailable = function () {
    return this.status === "ready";
};

Chef.prototype.cookAsync = function (menu) {
    //요리하는거
    var chef = this;
    return new Promise(function (resolve) {
        setTimeout(function () {
            chef.status = "ready";
            resolve(menu);
        }, menu.time);
    });
};

export function Server(name, time) {
    this.name = name;
    this.status = "ready";
    this.time = time;
}
Server.prototype.isAvailable = function () {
    return this.status === "ready";
}
Server.prototype.servingAsync = function (menu) {
    var server = this;
    return new Promise(function (resolve) {
        setTimeout(function () {
            server.status = "ready";
            resolve(menu);
        }, server.time);
    });
}
