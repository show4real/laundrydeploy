import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleAutoComplete from "react-auto-complete-address-fields";
import "react-auto-complete-address-fields/build/GoogleAutoComplete.css";

class Test extends React.Component {
    constructor() {
        super();
        this.callbackFunc = this.callbackFunc.bind(this);
    }

    callbackFunc = (autoCompleteData) => {
        console.log(autoCompleteData);
        //You can use the address data, passed by autocomplete as you want.
    };

    render() {
        return (
            <GoogleAutoComplete
                apiKey="AIzaSyDafPdwDcLIJk5Wd9KBEwcJKnA2mhlrtGg"
                id="location"
                fields={{
                    streetAddress: "route",
                    streetAddress2: "administrative_area_level_4",
                    locality: "locality",
                    cityOrState: "administrative_area_level_1",
                    postalcode: "postal_code",
                    country: "country",
                }}
                callbackFunction={this.callbackFunc}
            />
        );
    }
}

export default Test;
if (document.getElementById("test")) {
    ReactDOM.render(<Test />, document.getElementById("test"));
}
