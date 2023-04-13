import React from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const AddressPicker = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Enter address"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </StandaloneSearchBox>
            {props.markerPosition && <Marker position={props.markerPosition} />}
        </GoogleMap>
    ))
);

export default AddressPicker;
