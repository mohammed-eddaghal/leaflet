import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { camion } from 'src/app/camion/model/camion.model';
import { poubelle } from 'src/app/poubelle/model/poubelle.model';
import { style } from '@angular/animations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  private map: L.Map;

  private centroid: L.LatLngExpression = [34.01908140063287, -6.849192298632323]; 

  icongarbege = new L.Icon({
    iconUrl: 'assets/poubelle.png',
    iconRetinaUrl: 'assets/poubelle.png',
    iconSize:    [35, 40],
    iconAnchor:  [12, 40],
    popupAnchor: [3, -40],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  icongarbegeD = new L.Icon({
    iconUrl: 'assets/poubelle-danger.png',
    iconRetinaUrl: 'assets/poubelle-danger.png',
    iconSize:    [35, 40],
    iconAnchor:  [12, 40],
    popupAnchor: [3, -40],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  iconCamion = new L.Icon({
    iconUrl: 'assets/16348.png',
    iconRetinaUrl: 'assets/16348.png',
    iconSize:    [35, 40],
    iconAnchor:  [12, 40],
    popupAnchor: [3, -40],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  private listMarkers = [{
    id: 1,
    latitude: 34.01908140063287,
    langitud: -6.849192298632323,
    nivRemp: 15,
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
    nivRemp: 75,
    name: 'P5'
  }, {
    id: 6,
    latitude: 34.022917829245564, langitud: -6.846109180280347,
    nivRemp: 79,
    name: 'P6'
  }];

  //Charger la la liste des poubelle 
  chargeList(listMarkers) : poubelle[]{

    let listPoubelle = [];

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

  getCamion(): camion {
    let c = new camion(0, 34.02160888075479, -6.853381776506305, 220) ;
    return c ;
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

    //Recupper l'obeject camion
    let camio = this.getCamion() ;

    //Recupper la position du camion
    let camionPos = [camio.getLatitude, camio.getLangitud];

    // Afficher la liste des poubelle
    var listPoubelle = [];
    listPoubelle = this.chargeList(this.listMarkers) ;
    
    // Afficher la liste des poubelle a vider
    var listGarbege = [];
    listGarbege = this.ListePoubelleVider(listPoubelle, camio.getRemp) ;

    //Ajouter le markeur de camion 
    const marker = L.marker([camio.getLatitude, camio.getLangitud], { icon: this.iconCamion });
    marker.addTo(this.map);
    marker.bindPopup('camion test');

    //Dessiner les poubelle sur la carte 
    for (let i = 0; i < listPoubelle.length; i++) {
      this.addMarker(listPoubelle[i]);
    }

    //Dessiner le trajet
    this.drawTrajet(listGarbege, camionPos);

    tiles.addTo(this.map);
  }

  // Ajouter une markeur a la carte
  addMarker(poubel: poubelle){
    let icongarbege ;
    if(poubel.getNivRemp < 70)
      { icongarbege = this.icongarbege ; }
    else
      { icongarbege = this.icongarbegeD ; }
    const marker = L.marker([poubel.getLatitude, poubel.getLangitud], { icon: icongarbege });
    marker.addTo(this.map);
    marker.bindPopup(poubel.getName + '</br>Taux de remplisage :<b>' + poubel.getNivRemp + ' %</b>');
  }

  //Calculer la distance entre deux position
  getDistance(from, to) {
    return from.distanceTo(to);
  }

  //Fonction qui dessine le trajer
  drawTrajet(listMarkersTodraw :poubelle[], locationCamio){

    var locationCamioCourant = locationCamio;
    var listMarkersRestant = listMarkersTodraw;

    if(listMarkersRestant.length != 0){
      //traitemen de dession

      //l'indice de la poubelle suivant
      var index = 0;

      var distanceMin = this.getDistance(L.latLng(listMarkersRestant[index].getLatitude, listMarkersRestant[index].getLangitud),
        L.latLng(locationCamioCourant[0], locationCamioCourant[1])
      );

      var idGarbege = listMarkersRestant[index].getId;

      if(listMarkersRestant.length !=1) {

        //Recuperer la poubelle le plus proche
        for (let i = 0; i < listMarkersRestant.length; i++) {
          let distance = this.getDistance(L.latLng(listMarkersRestant[i].getLatitude, listMarkersRestant[i].getLangitud),
            L.latLng(locationCamioCourant[0], locationCamioCourant[1]));

          if (distance < distanceMin) {
            distanceMin = distance ;
            idGarbege = listMarkersRestant[i].getId;
            index = i; 
          }
        }

        //Dessiner la lige entre la camion et le plus proche poubelle
        const ligne = L.Routing.control({
          
          waypoints: [
            L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
            L.latLng(listMarkersRestant[index].getLatitude, listMarkersRestant[index].getLangitud)
          ],
          plan: L.Routing.plan([
            L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
            L.latLng(listMarkersRestant[index].getLatitude, listMarkersRestant[index].getLangitud)
          ], {
            createMarker: function() { return null }
          })
          
        }).addTo(this.map);
        

        //Positionner le camion sur la poubelle
        locationCamioCourant = [listMarkersRestant[index].getLatitude, listMarkersRestant[index].getLangitud];

        //Supprimer la poubelle traiter
        listMarkersRestant.splice(index,1);
      }else{

        //Dessiner la ligne entre la camion et la seule poubelle dans le tableau
        const ligne = L.Routing.control({
          waypoints: [
            L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
            L.latLng(listMarkersRestant[0].getLatitude, listMarkersRestant[0].getLangitud)
          ],
          plan: L.Routing.plan([
            L.latLng(locationCamioCourant[0], locationCamioCourant[1]),
            L.latLng(listMarkersRestant[index].getLatitude, listMarkersRestant[index].getLangitud)
          ], {
            createMarker: function() { return null }
          })
          
        }).addTo(this.map);

        //Positionner le camion sur la poubelle
        locationCamioCourant = [listMarkersRestant[0].getLatitude, listMarkersRestant[0].getLangitud];

        //Supprimer la poubelle traiter
        listMarkersRestant.splice(index, 1);
      }

      //Appell methode
      this.drawTrajet(listMarkersRestant, locationCamioCourant);
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
