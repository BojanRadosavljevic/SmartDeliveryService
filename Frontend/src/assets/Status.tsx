export function Status(id : number){
    switch(id){
        case 1:
            return "Spakovano";
        case 2:
            return "Preuzeto";
        case 3:
            return "Dozvoljeno";
        case 4:
            return "Zatvoreno";
    }
}