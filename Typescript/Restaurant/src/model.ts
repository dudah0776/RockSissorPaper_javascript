export class Menu{
    name: string;
    time: number;    
    constructor(name: string, time: number){
        this.name = name;
        this.time = time;
    }    
}

export class Chef{
    name: string;
    status: string;

    constructor(name: string, status: string){
        this.name = name;
        this.status = "ready";
    }

    isAvailable = () => {
        return this.status === "ready";
    }

    cookAsync = (menu: Menu) => {
        let chef = this;
        return new Promise((resolve) => {
            setTimeout(()=>{
                chef.status="ready";
                resolve(menu);
            }, menu.time);
        });
    }
}

export class Server{
    name: string;
    status: string;
    time: number;

    constructor(name: string, status: string, time: number){
        this.name = name;
        this.status = "ready";
        this.time = time;
    }

    isAvailable = ():boolean => {
        return this.status === "ready";
    }

    cookAsync = (menu:Menu) => {
        let server = this;
        return new Promise((resolve) => {
            setTimeout(()=>{
                server.status="ready";
                resolve(menu);
            }, server.time);
        });
    }
}