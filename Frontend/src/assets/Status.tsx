export function Status(id : number){
    switch(id){
        case 0:
            return "Spakovano";
        case 1:
            return "Preuzeto";
        case 2:
            return "Dostavljeno";
        case 3:
            return "Zatvoreno";
    }
}