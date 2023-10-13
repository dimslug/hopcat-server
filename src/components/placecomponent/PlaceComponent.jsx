import React, { useRef } from 'react'
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api"

const libraries = ['places'];
const PlaceComponent = () => {
    const inputRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    const handlePlaceChanged = () => {
        const [ place ] = inputRef.current.getPlaces();
        if(place) {
            console.log(place.formatted_address)
            console.log(place.geometry.location.lat())
            console.log(place.geometry.location.lng())
        }
    }

    return (
        isLoaded
        &&
        <StandaloneSearchBox
        onLoad={ref => inputRef.current = ref}
        onPlacesChanged={handlePlaceChanged}
        >
            <input
            type="text"
            className="form-control"
            placeholder='Enter Location'
            />
        </StandaloneSearchBox>
    )
}


export default PlaceComponent



function initMap() {
    const CONFIGURATION = {
      "ctaTitle": "Submit",
      "mapOptions": {
        "center": {
          "lat": 37.4221,
          "lng": -122.0841
        },
        "fullscreenControl": true,
        "mapTypeControl": false,
        "streetViewControl": true,
        "zoom": 11,
        "zoomControl": true,
        "maxZoom": 22,
        "mapId": ""
      },
      "mapsApiKey": "AIzaSyBQLiMjoJXGgIEFz6D2HOELLc9qgFUIhSU",
      "capabilities": {
        "addressAutocompleteControl": true,
        "mapDisplayControl": false,
        "ctaControl": true
      }
    };
    const componentForm = [
      'location',
      'locality',
      'administrative_area_level_1',
      'country',
      'postal_code',
    ];
  
    const getFormInputElement = (component) => document.getElementById(component + '-input');
    const autocompleteInput = getFormInputElement('location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });
    autocomplete.addListener('place_changed', function() {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: \'' + place.name + '\'');
        return;
      }
      fillInAddress(place);
    });
  
    function fillInAddress(place) { // optional parameter
      const addressNameFormat = {
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'administrative_area_level_1': 'short_name',
        'country': 'long_name',
        'postal_code': 'short_name',
      };
      const getAddressComp = function(type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return '';
      };
      getFormInputElement('location').value = getAddressComp('street_number') + ' ' +
        getAddressComp('route');
      for (const component of componentForm) {
        // Location field is handled separately above as it has different logic.
        if (component !== 'location') {
          getFormInputElement(component).value = getAddressComp(component);
        }
      }
    }
  }