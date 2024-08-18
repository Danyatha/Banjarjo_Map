import './style.css';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { transform, fromLonLat } from 'ol/proj';
import { Icon, Style, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import { Point, Polygon } from 'ol/geom';
import Overlay from 'ol/Overlay';
import Select from 'ol/interaction/Select';
import CircleStyle from 'ol/style/Circle';
import { primaryData } from './public/Data/primaryData';
import { secondaryData } from './public/Data/Tempat_Ibadah';
import { fasilitasUmumData } from './public/Data/Fasilitas_Umum';
import {posRondaData} from './public/Data/Pos_Ronda';
import { pemakamanUmumData } from './public/Data/Pemakaman_Umum';
import { kandangTernakData } from './public/Data/Kandang_Ternak';
import { umkmData } from './public/Data/umkm';
import { kantorDesaData } from './public/Data/Kantor_Desa';
import { situsSejarahData } from './public/Data/Situs_Sejarah';

const container = document.getElementById('popup');
const closer = document.getElementById('popup-closer');

const containerPolygon = document.getElementById('popup-polygon');
const closerPolygon = document.getElementById('popup-polygon-closer');

const popup = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
  offset: [0, -10],
});

const popupPolygon = new Overlay({
  element: containerPolygon,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM({
        url: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg70?access_token=pk.eyJ1IjoiZGFueWF0aGEiLCJhIjoiY2xudG0zb20yMDU2YjJsc2E4eTgwMWQxaCJ9.7eOpokK6ZhJM-2zAYPb96w',
      })
    })
  ],
  overlays: [popup, popupPolygon],
  view: new View({
    center: transform([111.16217699, -8.2128726], 'EPSG:4326', 'EPSG:3857'),
    zoom: 16
  })
});

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

closerPolygon.onclick = function () {
  popupPolygon.setPosition(undefined);
  closerPolygon.blur();
  return false;
};

const vectorSource = new VectorSource();
const vectorSource2 = new VectorSource();
const vectorSource3 = new VectorSource();
const vectorSource4 = new VectorSource();
const vectorSource5 = new VectorSource();
const vectorSource6 = new VectorSource();
const vectorSource7 = new VectorSource();
const vectorSource8 = new VectorSource();
const vectorSource9 = new VectorSource();

const createMarkerStyle = (fillColor) => new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({ color: fillColor }),
    stroke: new Stroke({
      color: 'black',
      width: 0.5,
    }),
  }),
});

const primaryMarkerStyle = createMarkerStyle('yellow');
const secondaryMarkerStyle = new Style ({
  image: new Icon ({
    src : '/assets/masjid.png',
    scale : 0.12,
    cursor: 'pointer'
  })
});
const fasilitasUmumStyle = new Style ({
  image: new Icon ({
    src : './public/assets/sekolah.png',
    scale : 0.12,
    cursor: 'pointer'
  })
});

const posRondaStyle = new Style ({
  image: new Icon ({
    src : './public/assets/pos_ronda.png',
    scale : 0.12,
    cursor: 'pointer'
  })
});
const pemakamanUmumStyle = new Style({
  image : new Icon ({
    src : './public/assets/pemakaman.png',
    scale : 0.12,
    cursor: 'pointer',
  }),

});
const kandangTernakStyle = new Style({
  image : new Icon ({
    src : './public/assets/kandang_ternak.png',
    scale : 0.12,
    cursor: 'pointer',
  }),
});
const umkmStyle = new Style({
  image : new Icon ({
    src : './public/assets/umkm.png',
    scale : 0.12,
    cursor: 'pointer',
  }),
});
const kantorDesaStyle = new Style({
  image : new Icon ({
    src : './public/assets/institusi.png',
    scale : 0.12,
    cursor: 'pointer',
  }),
});
const situsSejarahStyle = new Style({
  image : new Icon ({
    src : './public/assets/situs_sejarah.png',
    scale : 0.12,
    cursor: 'pointer',
  }),
});

const icon = new VectorLayer({
  source: vectorSource,
  style: primaryMarkerStyle,
  zIndex: 5,
});
// map.on('pointermove', function(evt) {
//   const hit = map.hasFeatureAtPixel(evt.pixel);
//   map.getTargetElement().style.cursor = hit ? 'pointer' : '';
// });
map.addLayer(icon);

const icon2 = new VectorLayer({
  source: vectorSource2,
  style: secondaryMarkerStyle,
  zIndex: 5,
});

map.addLayer(icon2);

const icon3 = new VectorLayer({
  source: vectorSource3,
  style: fasilitasUmumStyle,
  zIndex: 5,
});

map.addLayer(icon3);

const icon4 = new VectorLayer({
  source: vectorSource4,
  style: posRondaStyle,
  zIndex: 5,
});

map.addLayer(icon4);

const icon5 = new VectorLayer({
  source: vectorSource5,
  style: pemakamanUmumStyle,
  zIndex : 5,
});
map.addLayer(icon5);

const icon6 = new VectorLayer({
  source: vectorSource6,
  style : kandangTernakStyle,
  zIndex : 5,
});
map.addLayer(icon6);
const icon7 = new VectorLayer({
  source: vectorSource7,
  style : umkmStyle,
  zIndex : 5,
})
map.addLayer(icon7);
const icon8 = new VectorLayer({
  source: vectorSource8,
  style : kantorDesaStyle,
  zIndex : 5,
});
map.addLayer(icon8);
const icon9 = new VectorLayer({
  source: vectorSource9,
  style : situsSejarahStyle,
  zIndex : 5,
});
map.addLayer(icon9);

const addFeaturesWithStyle = (data, vectorSource, style) => {
  data.forEach(item => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item.coordinates)),
      name: item.name,
    });
    feature.setStyle(style);
    vectorSource.addFeature(feature);
  });
};

addFeaturesWithStyle(secondaryData, vectorSource2, secondaryMarkerStyle);
addFeaturesWithStyle(primaryData, vectorSource, primaryMarkerStyle);
addFeaturesWithStyle(fasilitasUmumData, vectorSource3, fasilitasUmumStyle);
addFeaturesWithStyle(posRondaData, vectorSource4, posRondaStyle);
addFeaturesWithStyle(pemakamanUmumData, vectorSource5, pemakamanUmumStyle);
addFeaturesWithStyle(kandangTernakData, vectorSource6, kandangTernakStyle);
addFeaturesWithStyle(umkmData, vectorSource7, umkmStyle);
addFeaturesWithStyle(kantorDesaData, vectorSource8, kantorDesaStyle);
addFeaturesWithStyle(situsSejarahData, vectorSource9, situsSejarahStyle);

const select = new Select({
  hitTolerance: 10,
  stopEvent: true,
});

map.addInteraction(select);

map.on('click', function (event) {
  const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
    return feature;
  });

  if (!feature) {
    popup.setPosition(undefined);
    popupPolygon.setPosition(undefined);
  }
});

map.on('singleclick', function (event) {
  const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
    return feature;
  });
  if (feature && feature.getGeometry() instanceof Polygon) {
    return;
  }

  if (feature) {
    const coordinates = feature.getGeometry().getCoordinates();
    const name = feature.get('name');
    const popupContent = `<div>${name}</div>`;
    popup.setPosition(coordinates);
    document.getElementById('popup-content').innerHTML = popupContent;
    popup.setPositioning(coordinates);
  }
});

const addFeaturesToSource = (data, vectorSource) => {
  data.forEach(item => {
    const feature = new Feature({
      geometry: new Point(transform(item.coordinates, 'EPSG:4326', 'EPSG:3857')),
      name: item.name,
    });
    vectorSource.addFeature(feature);
  });
};

addFeaturesToSource(primaryData, vectorSource);
addFeaturesToSource(secondaryData, vectorSource2);
addFeaturesToSource(fasilitasUmumData, vectorSource3);
addFeaturesToSource(posRondaData, vectorSource4);
addFeaturesToSource(pemakamanUmumData, vectorSource5);
addFeaturesToSource(kandangTernakData, vectorSource6);
addFeaturesToSource(umkmData, vectorSource7);
addFeaturesToSource(kantorDesaData, vectorSource8);
addFeaturesToSource(situsSejarahData, vectorSource9);

function loadGeoJSONLayer(url, style) {
  fetch(url)
    .then(response => response.json())
    .then(geojsonData => {

      geojsonData.features.forEach(feature => {
        if (feature.geometry.type === 'Polygon') {
          feature.geometry.coordinates[0] = feature.geometry.coordinates[0].map(coord => transform(coord, 'EPSG:4326', 'EPSG:3857'));
        } else if (feature.geometry.type === 'LineString') {
          feature.geometry.coordinates = feature.geometry.coordinates.map(coord => transform(coord, 'EPSG:4326', 'EPSG:3857'));
        }
      });

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData)
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: style
      });

      map.addLayer(vectorLayer);
    })
    .catch(error => {
      console.error('Error fetching GeoJSON:', error);
      alert('Error fetching GeoJSON. Please check your network connection or the URL.');
    });
}

const defaultStyle = new Style({
  stroke: new Stroke({
    color: 'black',
    width: 1,
    zIndex: 2,
  }),
  fill: new Fill({
    color: 'rgba(114,155,111,1.0)',
  })
});

const selectStyle = new Style({
  fill: new Fill({
    color: 'red',
  }),
  stroke: new Stroke({
    color: 'green',
    width: 2,
  }),
});

const status = document.getElementById('status');

let selected = null;
map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    selectStyle.getFill().setColor(f.get('COLOR') || '#ffff00');
    f.setStyle(selectStyle);
    return true;
  });

  if (selected) {
    status.innerHTML = selected.get('ECO_NAME');
  } else {
    status.innerHTML = '&nbsp;';
  }
});

loadGeoJSONLayer('./public/area/galit.geojson', defaultStyle);
loadGeoJSONLayer('./public/area/gemiring.geojson', defaultStyle);
loadGeoJSONLayer('./public/area/karangsono.geojson', defaultStyle);
loadGeoJSONLayer('./public/area/nglaos.geojson', defaultStyle);
loadGeoJSONLayer('./public/area/towo.geojson', defaultStyle);

map.on('click', function (event) {
  const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
    return feature;
  });

  if (feature && feature.getGeometry() instanceof Point) {
    return;
  }

  if (feature) {
    const coordinate = event.coordinate;
    const prop = feature.getProperties();
    let popupContent2 = '<div><table>';
    for (const key in prop) {
      if (prop.hasOwnProperty(key) && key !== 'geometry') {
        popupContent2 += `
          <tr>
            <td><strong>${key}</strong></td>
            <td>:</td>
            <td>${prop[key]}</td>
          </tr>`;
      }
    }
    popupContent2 += `</table></div>`;
    popupPolygon.setPosition(coordinate);
    document.getElementById('popup-content-polygon').innerHTML = popupContent2;
  }
});

let toggleCount = 0
function toggleFill() {
  map.getLayers().forEach(layer => {
    if (layer instanceof VectorLayer) {
      const style = layer.getStyle();
      if (style && style.getFill()) {
        const currentColor = style.getFill().getColor();
        if (currentColor === 'rgba(114,155,111,1.0)') {
          style.getFill().setColor('transparent');
          toggleCount--;
        } else {
          style.getFill().setColor('rgba(114,155,111,1.0)');
          toggleCount++;
        }
        layer.setStyle(style);
      }
    }
  });

  const mapContainer = document.getElementById('map');
  const status = document.getElementById('status');

  if (toggleCount % 2 !== 0) {
    mapContainer.classList.add('disable-hover');
    status.style.display = 'none';
  } else {
    mapContainer.classList.remove('disable-hover');
    status.style.display = 'block';
  }
}

document.getElementById('fillButton').addEventListener('click', toggleFill);

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.input');
  const clearButton = document.getElementById('clear');
  const resultsList = document.getElementById('list');

  const combinedData = [...fasilitasUmumData, ...secondaryData, ...primaryData, ...pemakamanUmumData, ...posRondaData,...umkmData,...kantorDesaData,...kandangTernakData, ...situsSejarahData, ...situsSejarahData]; 

  const items = combinedData.map(data => data.name);

  searchInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (value && value.trim().length > 0) {
      value = value.trim().toLowerCase();
      setResults(value);
    } else {
      clearResults();
    }
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = '';
    clearResults();
  });

  function setResults(query) {
    clearResults();
    const filteredItems = combinedData.filter(data => data.name.toLowerCase().includes(query));
    filteredItems.forEach(data => {
      const li = document.createElement('li');
      li.textContent = data.name;
      li.addEventListener('click', () => {
        selectItem(data);
      });
      resultsList.appendChild(li);
    });
  }

  function clearResults() {
    resultsList.innerHTML = '';
  }

  function selectItem(data) {
    if (data && data.coordinates && data.coordinates.length === 2) {
      const [longitude, latitude] = data.coordinates;

      const view = map.getView();
      view.animate({
        center: fromLonLat([longitude, latitude]),
        duration: 1000,
        zoom: 17
      });

      const coordinates = fromLonLat([longitude, latitude]);
      const popupContent = `<div>${data.name}</div>`;
      document.getElementById('popup-content').innerHTML = popupContent;
      popup.setPosition(coordinates);

      clearResults();
    }
  }
});


