export class poubelle {

    private id: number;
    private latitude: number;
    private langitud: number;
    private nivRemp: number;
    private name: string;

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

    set setId(id) {
        this.id = id;
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

    get getNivRemp() {
        return this.nivRemp;
    }

    set setNivRemp(nivRemp) {
        this.nivRemp = nivRemp;
    }

    get getName() {
        return this.name;
    }

    set setName(name) {
        this.name = name;
    }

  }
