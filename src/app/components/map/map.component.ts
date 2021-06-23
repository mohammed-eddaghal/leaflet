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
  private  routes;
  private camionPos: L.LatLngExpression = [34.02160888075479, -6.853381776506305];
  private centroid: L.LatLngExpression = [34.01908140063287, -6.849192298632323]; //

    icongarbege = new L.Icon({
    iconUrl: 'https://image.flaticon.com/icons/png/512/684/684113.png',
    iconRetinaUrl: 'https://image.flaticon.com/icons/png/512/684/684113.png',
    iconSize:    [35, 40],
    iconAnchor:  [12, 40],
    popupAnchor: [3, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  iconCamion = new L.Icon({
    iconUrl: '/assets/16348.png',
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
    latitude: 34.02132363619184, langitud: -6.845276100828468,
    nivRemp: 40,
    name: 'P3'
  }, {
    id: 4,
    latitude: 34.02190020147593, langitud: -6.84476081164375,
    nivRemp: 55,
    name: 'P4'
  }, {
    id: 5,
    latitude: 34.022099742205995, langitud: -6.846452503011824,
    nivRemp: 15,
    name: 'P5'
  }, {
    id: 6,
    latitude: 34.022917829245564, langitud: -6.846109180280347,
    nivRemp: 79,
    name: 'P6'
  }];

  //listGarbege = [3, 6, 5, 1];
  listGarbege = [3, 6, 5, 2];
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

    console.log(this.listMarkers[1].latitude + ',' + this.listMarkers[1].langitud);

    const marker = L.marker(this.camionPos, { icon: this.iconCamion });
    marker.addTo(this.map);
    marker.bindPopup('camion test');

    for (let i = 0; i < this.listMarkers.length; i++) {
      this.addMarker(this.listMarkers[i].latitude, this.listMarkers[i].langitud, i, this.icongarbege);

      this.getDistance(L.latLng(this.camionPos[0], this.camionPos[1]),
        L.latLng(this.listMarkers[i].latitude, this.listMarkers[i].langitud));
      }

    /*const xx = L.Routing.control({
      waypoints: [
        L.latLng(this.camionPos[0], this.camionPos[1]),
        L.latLng(this.listMarkers[1].latitude, this.listMarkers[1].langitud)
      ]
    }).addTo(this.map);*/

    console.log("////");
    tiles.addTo(this.map);

    this.drawTrajet(this.listGarbege, this.camionPos);
  }

  // tslint:disable-next-line:typedef
  addMarker(lat, lang, x, smallIcon){
    const marker = L.marker([lat, lang], { icon: smallIcon });
    marker.addTo(this.map);
    marker.bindPopup(this.listMarkers[x].name +
                      '</br>Taux de remplisage :<b>' +
                      this.listMarkers[x].nivRemp + ' %</b>');
  }

  // tslint:disable-next-line:typedef
  getDistance(from, to) {
    console.log('la distance est :' + from.distanceTo(to));

    return from.distanceTo(to);
  }

  // tslint:disable-next-line:typedef
  drawTrajet(listMarkersTodraw, locationCamio){
    var locationCamioCourant = locationCamio;
    var listMarkersRestant = listMarkersTodraw;
    var index = 0;
    var x=this.getDistance(L.latLng(this.listMarkers[listMarkersRestant[0] - 1].latitude, this.listMarkers[listMarkersRestant[0] - 1].langitud),
      L.latLng(locationCamioCourant[0], locationCamioCourant[1]));
    var idGarbege = listMarkersRestant[0];

    console.log('la taille de table : '+listMarkersRestant.length);
    if(listMarkersRestant.length !=1) {
      for (let i = 0; i < listMarkersRestant.length; i++) {
        console.log('--' + listMarkersRestant[i]);
        let y = this.getDistance(L.latLng(this.listMarkers[listMarkersRestant[i] - 1].latitude, this.listMarkers[listMarkersRestant[i] - 1].langitud),
          L.latLng(locationCamioCourant[0], locationCamioCourant[1]));

        if (y < x) {
          idGarbege = listMarkersRestant[i];
          index = i;
        }
      }

      const xx = L.Routing.control({
        waypoints: [
          L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
          L.latLng(this.listMarkers[idGarbege - 1].latitude, this.listMarkers[idGarbege - 1].langitud)
        ]
      });
      xx.addTo(this.map);

      console.log(idGarbege);

      listMarkersRestant.splice(index);
      locationCamioCourant = [this.listMarkers[idGarbege - 1].latitude, this.listMarkers[idGarbege - 1].langitud];
    }else{
      const xx = L.Routing.control({
        waypoints: [
          L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
          L.latLng(this.listMarkers[idGarbege - 1].latitude, this.listMarkers[idGarbege - 1].langitud)
        ]
      });
      xx.addTo(this.map);

      console.log(idGarbege);

      listMarkersRestant.splice(index);
      locationCamioCourant = [this.listMarkers[idGarbege - 1].latitude, this.listMarkers[idGarbege - 1].langitud];

    }
    while (listMarkersRestant.length != 0){
      this.drawTrajet(listMarkersRestant, locationCamioCourant);
    }

  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
