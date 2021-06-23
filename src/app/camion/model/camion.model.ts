export class camion {

    private id: number;
    private Remp: number;
  
    constructor(id: number, Remp: number) {
      this.id = id;
      this.Remp = Remp;
    }

    
    get getId() {
        return this.id;
    }

    set set(id) {
        this.id = id;
    }

    get getRemp() {
        return this.Remp;
    }

    set setRemp(Remp) {
        this.Remp = Remp;
    }

  }