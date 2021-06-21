import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: L.Map;
  private centroid: L.LatLngExpression = [34.01908140063287, -6.849192298632323]; //

  private listMarkers = [{
    latitude: 34.01908140063287,
    langitud: -6.849192298632323,
    nivRemp: 75,
    name: 'P1'
  }, {
    latitude: 34.02036268534806, langitud: -6.844374344755213,
    nivRemp: 30,
    name: 'P2'
  }, {
    latitude: 34.02132363619184, langitud:-6.845276100828468,
    nivRemp: 40,
    name: 'P3'
  }, {
    latitude: 34.02190020147593, langitud:-6.84476081164375,
    nivRemp: 55,
    name: 'P4'
  },{
    latitude: 34.022099742205995, langitud:-6.846452503011824,
    nivRemp: 15,
    name: 'P5'
  },{
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
      this.addMarker(this.listMarkers[i].latitude,this.listMarkers[i].langitud);
    }
    tiles.addTo(this.map);

  }

  addMarker(lat, lang){
    const marker = L.marker([lat, lang]);
    marker.addTo(this.map);
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
