export class poubelle{
    private id : number ;
    private nivRem : number ;
    private laltitude : number ;
    private lantitude : number ;
    private name : string ;

    constructor(id:number, laltitude : number, lantitude : number,){
        this.id = id ;

    }

    get getId(){
        return this.id ;
    }

    set setId(id){
        this.id = id ;
    }

    get getNivRem(){
        return this.nivRem ;
    }

    set setNivRem(nivRem){
        this.nivRem = nivRem ;
    }
}