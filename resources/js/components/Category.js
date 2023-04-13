import React, { Component } from "react";
import ReactDOM from "react-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getCategories } from "../services/categoryService";
import { Tabs, Button } from "antd";
import CarouselHolder from "./CarouselHolder";

const { TabPane } = Tabs;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: props.categories,
        };
    }

    // componentDidMount() {
    //     this.getCategories();
    // }

    // getCategories = () => {
    //     this.setState({ loading: true });
    //     getCategories().then(
    //         (res) => {
    //             this.setState({
    //                 categories: res.categories,
    //                 loading: false,
    //             });
    //         },
    //         (error) => {
    //             this.setState({ loading: false });
    //         }
    //     );
    // };

    render() {
        const { categories, loading } = this.state;
        const operations = <Button>View All</Button>;
        console.log(categories);

        return (
            <>
                {!loading && (
                    <>
                        <Carousel responsive={responsive}>
                            {categories.map((category) => {
                                return (
                                    <div
                                        style={{
                                            marginLeft: 30,
                                        }}
                                    >
                                        <div class="category-box-list">
                                            <a
                                                href={`/category/${category.id}`}
                                                class="category-name"
                                            >
                                                <h4>{category.name}</h4>
                                                {/* <h6>
                                                    {category.products_count}{" "}
                                                    items
                                                </h6> */}
                                            </a>
                                            <div class="category-box-view">
                                                <a href="#">
                                                    <img
                                                        src={category.image_url}
                                                        style={{
                                                            paddingLeft: 30,
                                                            height: 150,
                                                        }}
                                                        class="img-fluid blur-up lazyload"
                                                        alt=""
                                                    />
                                                </a>
                                                <a
                                                    href={`/category/${category.id}`}
                                                >
                                                    <button class="btn shop-button">
                                                        <span>Shop Now</span>
                                                        <i class="fas fa-angle-right"></i>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </>
                )}
            </>
        );
    }
}

export default Category;

// We only want to try to render our component on pages that have a div with an ID
// of "Category"; otherwise, we will see an error in our console
if (document.getElementById("category")) {
    ReactDOM.render(<Category />, document.getElementById("category"));
}
