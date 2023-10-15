import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api"
import { REACT_APP_GOOGLE_API_KEY } from "../../environments";

const libraries = ['places'];
const google = window.google;

console.log('Inside Place Component')




const PlaceComponent = ({ onAddressSelected, currentAddress }) => {
    const inputRef = useRef();

    //! useState
    const [selectedAddress, setSelectedAddress] = useState({
      formattedAddress: '',
      latitude: null,
      longitude: null
    });
 
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    const handlePlaceChanged = () => {
        const [ place ] = inputRef.current.getPlaces();
        if(place) {
          const newAddress = {
            formattedAddress: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };
          setSelectedAddress(newAddress);
          onAddressSelected(newAddress);
          
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
              placeholder={currentAddress ? currentAddress : 'Enter Location'}
     
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
      console.log(place)
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