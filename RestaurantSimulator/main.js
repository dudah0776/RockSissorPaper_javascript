function Menu(name, time) {
    this.name = name;
    this.time = time;
}
function Chef(name) {
    this.name = name;
    this.status = "ready";
}
function Server(name, time) {
    this.name = name;
    this.status = "ready";
    this.time = time;
}
var orders = [];
var cookings = [];
var servings = [];
var chefs = [new Chef("영모"), new Chef("현우")];
var servers = [new Server("종빈", 1000), new Server("재희", 2000)];
document.getElementById("sundea").onclick = function () {
    run(new Menu("순댓국", 1000));
};
document.getElementById("hejang").onclick = function () {
    run(new Menu("해장국", 2000));
};

function renderOrders() {
    var ordersEl = document.getElementById("orders");
    ordersEl.innerHTML = "";
    orders.forEach(function (order) {
        var liEl = document.createElement("li");
        liEl.textContent = order.name;
        ordersEl.append(liEl);
    });
}
function renderCookings() {
    var cookingsEl = document.getElementById("cookings");
    cookingsEl.innerHTML = "";
    cookings.forEach(function (menu) {
        var liEl = document.createElement("li");
        liEl.textContent = menu.name;
        cookingsEl.append(liEl);
    });
}
function renderServings() {
    var servingsEl = document.getElementById("servings");
    servingsEl.innerHTML = "";
    servings.forEach(function (menu) {
        var liEl = document.createElement("li");
        liEl.textContent = menu.name;
        servingsEl.append(liEl);
    })
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
Server.prototype.isAvailable = function () {
    return this.status === "ready";
}
Server.prototype.servingAsync = function (menu) {
    var server = this;
    return new Promise(function (resolve) {
        setTimeout(function () {
            server.status = "ready";
            resolve(menu);
        }, this.time);
    });
}

function findChef() {
    return new Promise(function (resolve, reject) {
        var findChefIntervalId = setInterval(function () {
            console.log("요리사를 찾는 중입니다...");
            for (var i = 0; i < chefs.length; i++) {
                if (chefs[i].isAvailable()) {
                    clearInterval(findChefIntervalId);
                    chefs[i].status = "cooking";
                    console.log(chefs[i].name + "가 요리할께");
                    resolve(chefs[i]);
                    return;
                }
            }
        }, 1000);
    })
}
function findServer(menu) {
    return new Promise(function (resolve, reject) {
        var findServerIntervalId = setInterval(function () {
            console.log("서빙할 사람을 찾는 중입니다...");
            for (var i = 0; i < servers.length; i++) {
                if (servers[i].isAvailable()) {
                    clearInterval(findServerIntervalId);
                    servers[i].status = "cooking";
                    console.log(servers[i].name + "가 서빙할께");
                    resolve(servers[i]);
                    return;
                }
            }
        }, 1000);
    })
}

function cooking(chef) {
    //첫번째 주문 가져오고 삭제    
    var menu = orders.shift();
    cookings.push(menu);
    console.log(chef.name + "가 " + menu.name + "을 요리중...");
    renderOrders();
    renderCookings();
    return chef.cookAsync(menu);
}

function serving(menu, server) {
    var serve_menu = cookings.splice(cookings.indexOf(menu), 1)[0];
    console.log(server.name + "가" + serve_menu.name + "을 서빙중...");
    servings.push(serve_menu);
    console.log(servings);
    renderCookings();
    renderServings();
    return server.servingAsync(menu);
}
function run(menu) {
    orders.push(menu);
    renderOrders();
    findChef().then(function (chef) {
        return cooking(chef);
    }).then(function (menu) {
        return findServer(menu);
    }).then(function (server) {
        return serving(menu, server);
    }).then(function (menu) {
        console.log(menu.name + "서빙완료");
        servings.splice(servings.indexOf(menu), 1);
        renderServings();
    });
}


