import Breakpoints from 'breakpoints-js';
import scriptLoader from '../../js/scriptLoader';

const $map = $("#map");
if ($map.length) {
  Breakpoints({
    big: {
      min: 992,
      max: Infinity
    },
  });
  Breakpoints.on('big', 'enter', () => {
    scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAP_API_KEY}`, () => {
      const map = new google.maps.Map($map[0], {
        zoom:   16,
        center: new google.maps.LatLng(window.GOOGLE_MAP_CENTER[0], window.GOOGLE_MAP_CENTER[1]),
        styles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      });

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(window.GOOGLE_MAP_CENTER[0], window.GOOGLE_MAP_CENTER[1]),
        map:      map,
      });
    });
  });
}

const styles = [
  {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers":     [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels",
    "stylers":     [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers":     [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers":     [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers":     [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "stylers": [
      {
        "hue": "#00aaff"
      },
      {
        "saturation": -100
      },
      {
        "gamma": 2.15
      },
      {
        "lightness": 12
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers":     [
      {
        "visibility": "on"
      },
      {
        "lightness": 24
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers":     [
      {
        "lightness": 57
      }
    ]
  }
];