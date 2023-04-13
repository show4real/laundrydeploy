import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider, Skeleton } from "antd";
import { DotChartOutlined } from "@ant-design/icons";

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

export class CarouselHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    rows = () => {
        let rows = [];

        for (let index = 0; index < 6; index++) {
            rows.push(
                <div class="item">
                    <Skeleton.Node active>
                        <DotChartOutlined
                            style={{
                                fontSize: 40,
                                color: "#bfbfbf",
                            }}
                        />
                    </Skeleton.Node>
                    <Divider />
                    <Skeleton.Button active size="small" shape="round" />
                </div>
            );
        }
        return rows;
    };

    render() {
        return <Carousel responsive={responsive}>{this.rows()}</Carousel>;
    }
}

export default CarouselHolder;
