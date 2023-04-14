import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: "",
        };
    }

    onChange = (e, state) => {
        this.setState({ [state]: e });
    };

    componentDidMount() {}

    openModal = () => {
        this.setState({ showModal: true });
    };

    render() {
        const { search } = this.state;
        return (
            <>
                <div class="search-box">
                    <div class="input-group">
                        <input
                            type="search"
                            class="form-control"
                            placeholder="I'm searching for."
                            onChange={async (e) => {
                                await this.onChange(e.target.value, "search");
                            }}
                        />

                        <button
                            class="btn"
                            disabled={search === ""}
                            type="button"
                            id="button-addon2"
                        >
                            <a
                                href={`../search/${search}`}
                                style={{
                                    textDecoration: "none",
                                    color: "none",
                                }}
                            >
                                {" "}
                                <i data-feather="search"></i>
                            </a>
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default SearchBar;

if (document.getElementById("searchbar")) {
    ReactDOM.render(<SearchBar />, document.getElementById("searchbar"));
}
