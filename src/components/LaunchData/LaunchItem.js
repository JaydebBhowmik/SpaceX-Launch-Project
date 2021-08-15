import React, {useEffect, useState} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import LAUNCH_DATA from './LaunchData';
import './Style.css'

function LaunchItem() {
    const [launches, setLaunches] = useState([]);
    const [filter, setFilter] = useState('');
    const [cmpLaunch, setCmpLaunch] = useState([]);


    useEffect(()=> {
        fetch('http://api.spacex.land/graphql/', {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({query: LAUNCH_DATA })
        }).then(Response => Response.json())
        .then(data => setLaunches(data.data.launchesPast))
    }, []);

    function handleChange(e) {
        setCmpLaunch({ cmpLaunch: e.target.value });
        console.log(cmpLaunch);
    }
    

    return (
        <div className="launch__wraper">
            <Container >
                <div className="search-launch-data" >
                    <Row>
                    <Col xs={6} >
                        <input 
                        type="text"
                        placeholder="search By Mission name or Rocket Name" 
                        onChange={(event) => { setFilter(event.target.value)}} />
                        </Col>
                        <Col xs={6} >
                        <select onChange={handleChange}>
                            {
                                launches.map((option, key) => (
                                    <option value={option.mission_name} key={key}>{option.mission_name}</option>
                                ))
                            }
                        </select>
                        <select onChange={handleChange}>
                            {
                                launches.map((option, key) => (
                                    <option value={option.mission_name} key={key}>{option.mission_name}</option>
                                ))
                            }
                        </select>
                        <button className="btn-compare">Compare</button>
                        </Col>
                    </Row>
                </div>

                <Row>
                    {
                        launches.filter((val) => {
                            if(filter === "") {
                                return val
                            } else if (val.mission_name.toLowerCase().includes(filter.toLowerCase()) || val.rocket.rocket_name.toLowerCase().includes(filter.toLowerCase())) {
                                return val
                            }
                        }).map((launch, index) => 
                        <Col className="launch-info__box" xs={4} key={index} >
                            <div className="launch-info__wraper">
                            <h3 className="launch-info--title">{launch.mission_name} </h3>

                            <strong className="mission-details">Mission Details :</strong>
                            <ul className="mission-details__list">
                                <li className="mission-details__list-item"><span>Launch Date:</span> <strong>{launch.launch_date_local}</strong></li>
                                <li className="mission-details__list-item flxc"><span>launch_site:</span>  <strong>{launch.launch_site.site_name_long}</strong></li>
                                <li className="mission-details__list-item"><span>Mission Status:</span> <strong>{ launch.launch_success = 'true' ? "Success": "Fail"}</strong></li>
                                <li className="mission-details__list-item"><span>For More Info:</span> <strong><a className="btn-more" href={ launch.links.wikipedia } > More Details </a> </strong> </li>
                            </ul>

                            <strong className="mission-details">Rocket Details :</strong>
                            <ul className="mission-details__list">
                                <li className="mission-details__list-item"><span>Rockst Name :</span> <strong>{launch.rocket.rocket_name}</strong></li>
                                <li className="mission-details__list-item"><span>Rockst Type :</span> <strong>{launch.rocket.rocket_type}</strong></li>
                                <ul className="inner-list">
                                {
                                    launch.rocket.first_stage.cores.map((core, index) => 
                                        <div key={index}>
                                            <li className="inner-list-item"><span>flight No :</span> <strong> {core.flight}</strong></li>
                                            <li className="inner-list-item"><span>Reuse :</span> <strong>{core.core.reuse_count} </strong></li>
                                            <li className="inner-list-item"><span>status :</span> <strong>{core.core.status} </strong></li>
                                        </div>
                                    )
                                }
                                </ul>
                                <ul className="mission-details__list">
                                {
                                    launch.rocket.second_stage.payloads.map((item, index) => 
                                        <div key={index}>
                                            <li className="mission-details__list-item"><span>Launch material :</span> <strong>{item.payload_type} </strong></li>
                                            <li className="mission-details__list-item"><span>material Weight :</span> <strong>{item.payload_mass_kg} </strong></li>
                                        </div>
                                    )
                                }
                                </ul>
                            </ul>

                            <strong className="mission-details">ships Details :</strong>
                            <ul className="ship-details">
                                {
                                    launch.ships.map((item, index) => 
                                    <li className="ship-details--item" key={index}>
                                    <div className="ship-img"><img style={{maxWidth: '100%'}} src={item.image} alt={item.image} /> </div>
                                    <div className="ship-info">
                                        <strong>{item.name} </strong>
                                        <p>{item.home_port}</p>
                                    </div>
                                </li>
                                    )
                                }
                            </ul>
                            </div>
                        </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}
export default LaunchItem;