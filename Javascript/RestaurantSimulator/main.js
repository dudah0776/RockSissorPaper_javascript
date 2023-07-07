import {Menu} from "./model/models.js";
import {Chef} from "./model/models.js";
import {Server} from "./model/models.js";

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

function rendering(id, list){
    var El = document.getElementById(id);
    El.innerHTML = "";
    list.forEach(function (item) {
        var liEl = document.createElement("li");
        liEl.textContent = item.name;
        El.append(liEl);
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
function findServer() {
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
    var menu = orders.shift();
    cookings.push(menu);
    console.log(chef.name + "가 " + menu.name + "을 요리중...");
    rendering("orders",orders);
    rendering("cookings",cookings);
    return chef.cookAsync(menu);
}

function serving(menu, server) {
    var serve_menu = cookings.splice(cookings.indexOf(menu), 1)[0];
    console.log(server.name + "가" + serve_menu.name + "을 서빙중...");
    servings.push(serve_menu);
    rendering("cookings",cookings);
    rendering("servings",servings);
    return server.servingAsync(menu);
}

function run(menu) {
    orders.push(menu);
    rendering("orders",orders);
    findChef().then(function (chef) {
        return cooking(chef);
    }).then(function (menu) {
        return findServer(menu);
    }).then(function (server) {
        return serving(menu, server);
    }).then(function (menu) {
        console.log(menu.name + "서빙완료");
        servings.splice(servings.indexOf(menu), 1);
        rendering("servings",servings);
    });
}


