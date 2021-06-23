export class poubelle {

    private id: number;
    private latitude: number;
    private langitud: number;
    private nivRemp: number;
     name: string;

  
    constructor(id: number, latitude: number, langitud: number, nivRemp: number, name: string) {
      this.id = id;
      this.latitude = latitude;
      this.langitud = langitud;
      this.nivRemp = nivRemp;
      this.name = name
    }

    get getId() {
        return this.id;
    }

    set set(id) {
        this.id = id;
    }

    get getNivRemp() {
        return this.nivRemp;
    }

    set setNivRemp(nivRemp) {
        this.nivRemp = nivRemp;
    }


  }
  
  

    
  