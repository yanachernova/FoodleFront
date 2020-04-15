import React, { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";

const Map = props => {
  useEffect(()=>{
    sessionStorage.removeItem('mapAddress')
  },[])
  const [address, setAddress] = React.useState("");
  const [zoom] = React.useState(15);
  const [mapPosition, setMapPosition] = React.useState({
    lat: -33,
    lng: -77,
  });
  const [markerPosition, setMarkerPosition] = React.useState({
    lat: -33,
    lng: -77,
  });
  
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setMapPosition(latLng);
    setMarkerPosition(latLng);
    console.log(latLng);
    console.log(results);
    sessionStorage.setItem('mapAddress', results[0].formatted_address)
  };
  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        // google={this.props.google}
        defaultZoom={zoom}
        defaultCenter={{
          lat: mapPosition.lat,
          lng: mapPosition.lng,
        }}
      >
        {/*Marker*/}
        <Marker
          //google={this.props.google}
          name={"Dolores park"}
          draggable={false}
          position={{
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          }}
        />
        <Marker />
        {/* InfoWindow on top of marker */}
        {address ? (
          <InfoWindow
            /* onClose={this.onInfoWindowClose} */
            position={{
              lat: markerPosition.lat + 0.0018,
              lng: markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}> {address} </span>
            </div>
          </InfoWindow>
        ) : (
          <></>
        )}
      </GoogleMap>
    ))
  );
  return (
    <>
    
      <h5 className="text-center">
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              Search your address
              <input {...getInputProps({ placeholder: "Type address" })} />
              <div>
                {loading ? <div> ...loading </div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </h5>
      {
      address?
      (<div>
        <AsyncMap
          googleMapURL=""
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: "500px", width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>)
      :
      (<></>)
    }
    </>
  );
};

export default Map;
