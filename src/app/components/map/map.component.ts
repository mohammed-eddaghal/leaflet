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

    // create 5 random jitteries and add them to map
    /*const jittery = Array(5).fill(this.centroid).map(
        x => [x[0] + (Math.random() - .5)/10, x[1] + (Math.random() - .5)/10 ]
      ).map(
        x => L.marker(x as L.LatLngExpression)
      ).forEach(
        x => x.addTo(this.map)
      );*/



    //const x=this.listMarkers[1].latitude; const y=  this.listMarkers[1].langitud;
    console.log(this.listMarkers[1].latitude + ',' + this.listMarkers[1].langitud);
    /*const testMakrker: L.LatLngExpression = [this.listMarkers[1].latitude, this.listMarkers[1].langitud];
    const x = L.marker(this.centroid);
    const y = L.marker(testMakrker);
    y.addTo(this.map);
    x.addTo(this.map);*/
    //this.addMarker1([y,x]);

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

    L.Routing.control({
      router: L.Routing.osrmv1({
          serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      //lineOptions: {styles: [{color: '#242c81', weight: 7}]},
      fitSelectedRoutes: false,
      //altLineOptions: {styles: [{color: '#ed6852', weight: 7}]},
      show: false,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(this.listMarkers[4].latitude,this.listMarkers[4].langitud),
        L.latLng(this.listMarkers[1].latitude,this.listMarkers[1].langitud)
      ]
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
