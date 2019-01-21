import React, {PureComponent} from 'react';
import styles from "./GoogleMap.module.scss";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import PropTypes from "prop-types";
import Card from "../../App";

export class MapContainer extends PureComponent {
    state = {
        center: {
            lat: 40.7831,
            lng: -73.9712
        },
        zoom: 14
    };
    _onChange = ({center, zoom}) => {
        this.setState({
            center: {
                lat: 40.7831,
                lng: -73.9712
            },
            zoom: zoom,
        });
    };

    render() {
        const {properties, activeProperty} = this.props;
        const style = {
            width: '49vw',
            height: '100vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }
        return (
            <div className={styles.wrapper}>
                <Map
                    item
                    m={18}
                    style={style}
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{
                        lat: activeProperty.latitude,
                        lng: activeProperty.longitude
                    }}
                >
                    {properties.map(item => (<Marker key={item._id}
                                                     position={{lat: item.latitude, lng: item.longitude}}/>))}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9_abOu_dTqGFHeMwAHA1Hf5VheHbpaQ4'
})(MapContainer);