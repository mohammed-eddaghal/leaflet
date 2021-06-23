import { poubelle } from 'src/app/poubelle/model/poubelle.model';
import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  private map: L.Map;
  private centroid: L.LatLngExpression = [34.01908140063287, -6.849192298632323]; //

  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl: 'https://image.flaticon.com/icons/png/512/684/684113.png',
    iconRetinaUrl: 'https://image.flaticon.com/icons/png/512/684/684113.png',
    iconSize:    [35, 40],
    iconAnchor:  [12, 40],
    popupAnchor: [3, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  
  private listMarkers = [{
    id: 1,
    latitude: 34.01908140063287,
    langitud: -6.849192298632323,
    nivRemp: 75,
    name: 'P1'
  }, {
    id: 2,
    latitude: 34.02036268534806, langitud: -6.844374344755213,
    nivRemp: 30,
    name: 'P2'
  }, {
    id: 3,
    latitude: 34.02132363619184, langitud:-6.845276100828468,
    nivRemp: 40,
    name: 'P3'
  }, {
    id: 4,
    latitude: 34.02190020147593, langitud:-6.84476081164375,
    nivRemp: 55,
    name: 'P4'
  },{
    id: 5,
    latitude: 34.022099742205995, langitud:-6.846452503011824,
    nivRemp: 15,
    name: 'P5'
  },{
    id: 6,
    latitude: 34.022917829245564, langitud:-6.846109180280347,
    nivRemp: 70,
    name: 'P6'
  }];


  chargeList(listMarkers) : poubelle[]{

    let listPoubelle = [];
    let poubel : poubelle ;
  
    console.log( "liste" + listMarkers[1].id);

    for (let i = 0; i < listMarkers.length; i++) {

      let poubel = new poubelle(listMarkers[i].id, listMarkers[i].latitude, listMarkers[i].langitud, listMarkers[i].nivRemp, listMarkers[i].name) ;
      listPoubelle.push(poubel);
    }
    
    return listPoubelle;
  }

  // return la liste des poubelle a vider 
  ListePoubelleVider(listeP: poubelle[], tailleCamion: number) : poubelle[]{
    
    let listPoubelle = [];

    // Trie la liste des poubelle selon le niveau de remplissage 
    listeP.sort(function compare(a, b) {
      if (a.getNivRemp < b.getNivRemp)
         return 1;
      if (a.getNivRemp > b.getNivRemp )
         return -1;
      return 0;
    });

    for (let i = 0; i < listeP.length; i++) {
      
      if(listeP[i].getNivRemp <= tailleCamion){
        // Gareder la poubelle 
        listPoubelle.push(listeP[i]);

        // Retirez la taille de la poubelle de la taille du camion
        tailleCamion = tailleCamion - listeP[i].getNivRemp
      }
      else{
        // Gareder la poubelle 
        listPoubelle.push(listeP[i]);
        break;
      }
    }


    
    return listPoubelle;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      minZoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var listPoubelle1 = [];
    listPoubelle1 = this.chargeList(this.listMarkers) ;
    
    console.log("la liste des poubelle  ");
    for( let i=0; i<listPoubelle1.length ; i++ ){
      console.log(listPoubelle1[i]);
    }

    console.log("\n ************************ \n");

    var listPoubelle = [];
    listPoubelle = this.ListePoubelleVider(listPoubelle1, 220) ;
    
    console.log("la liste des poubelle a vider ");
    for( let i=0; i<listPoubelle.length ; i++ ){
      console.log(listPoubelle[i]);
    }

    
    
    



























    for (let i = 0; i < this.listMarkers.length; i++) {
      this.addMarker(this.listMarkers[i].latitude,this.listMarkers[i].langitud,i);
    }
    tiles.addTo(this.map);

    L.Routing.control({
      
      waypoints: [
        L.latLng(this.listMarkers[0].latitude,this.listMarkers[0].langitud),
        L.latLng(this.listMarkers[4].latitude,this.listMarkers[4].langitud)
      ],

    }).addTo(this.map);

  }

  addMarker(lat, lang, x){
    const marker = L.marker([lat, lang], { icon: this.smallIcon });
    marker.addTo(this.map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup "+x+" .");
  }
  addMarker1(latlang){
    const marker = L.marker(latlang);
    marker.addTo(this.map);
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
