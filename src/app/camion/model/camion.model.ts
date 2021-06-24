export class camion {

    private id: number;
    private latitude: number;
    private langitud: number;
    private Remp: number;
  
    constructor(id: number, latitude: number, langitud: number, Remp: number) {
      this.id = id;
      this.latitude = latitude;
      this.langitud = langitud;
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

    get getLatitude() {
        return this.latitude;
    }

    set seTLatitude(latitude) {
        this.latitude = latitude;
    }

    get getLangitud() {
        return this.langitud;
    }

    set seTLangitud(langitud) {
        this.langitud = langitud;
    }

  }