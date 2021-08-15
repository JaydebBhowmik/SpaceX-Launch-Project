import './style.css';

import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap'
import { BannerImage } from './BannerImage';
import './style.css';

export default class Banner extends Component {
    render() {
        return (
            <Carousel fade indicators={false} nextLabel={false} prevLabel={false} className="banner-wraper">
                {
                    BannerImage.map((item, index)=>{
                        const {Banner, Alt, Caption} = item;
                        return (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={Banner} alt={Alt} />
                            <Carousel.Caption>
                                <h3>{Caption.title}</h3>
                                <p>{Caption.details}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        )
    }
}
