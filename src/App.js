import React from 'react';
import styles from './App.module.scss';
import data from './data/Data'
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import MapContainer from "./components/GoogleMap/GoogleMap";
import image from './images/house-location-pin.svg';

class App extends React.PureComponent {
    state = {
        properties: data.properties,
        activeProperties: data.properties[0],
        filterIsVisible: false,
        isFiltering: false,
        filteredProperties: [],
        filterBedrooms: 'any',
        filterBathrooms: 'any',
        filterCars: 'any',
    };

    static checkIsFilter(source, target) {
        return source === parseInt(target) || target === 'any'
    }

    toggleFilter = (e) => {
        e.preventDefault();
        this.setState({
            filterIsVisible: !this.state.filterIsVisible
        })
    };

    changeActiveProperty = (item) => {
        this.setState({activeProperties: item})
    };

    handleFilterChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => this.filterProperties());
    };

    filterProperties = () => {
        const {properties, filterBedrooms, filterBathrooms, filterCars} = this.state;
        const isFiltering = filterBedrooms !== 'any' || filterBathrooms !== 'any' || filterCars !== 'any';
        const getFilterProperties = (properties) => {
            const filteredProperties = [];
            properties.map(property => {
                const {bedrooms, bathrooms, carSpaces} = property;
                const match = App.checkIsFilter(bedrooms, filterBedrooms) && App.checkIsFilter(bathrooms, filterBathrooms) && App.checkIsFilter(carSpaces, filterCars);

                match && filteredProperties.push(property);
            });

            return filteredProperties;
        };
        this.setState({
            filteredProperties: getFilterProperties(properties),
            activeProperties: getFilterProperties(properties)[0] || properties[0],
            isFiltering
        })
    };

    clearFilter = (e, form) => {
        e.preventDefault();
        this.setState({
            isFiltering: false,
            activeProperties: data.properties[0],
            filterBedrooms: 'any',
            filterBathrooms: 'any',
            filterCars: 'any',
        });
        form.reset();
    };

    render() {
        const {properties, activeProperties, filterIsVisible, filteredProperties, isFiltering} = this.state;
        const propertiesList = isFiltering ? filteredProperties : properties;
        return (
            <div className={styles.layout}>
                <MapContainer
                    properties={propertiesList}
                    activeProperty={activeProperties}
                    filteredProperties={filteredProperties}
                    isFiltering={isFiltering}
                    changeActiveProperty={this.changeActiveProperty}
                />
                <div className={styles.listings}>
                    <Header
                        filterIsVisible={filterIsVisible}
                        toggleFilter={this.toggleFilter}
                        handleFilterChange={this.handleFilterChange}
                        clearFilter={this.clearFilter}
                    />
                    <div className={styles.cards}>
                        <div className={styles["cards-list"]}>
                            {propertiesList.map(property => <Card
                                key={property._id}
                                property={property}
                                activeProperty={activeProperties}
                                handleChange={this.changeActiveProperty}/>)}

                            {(isFiltering && propertiesList.length === 0) &&
                            <p className={styles["empty-result"]}>
                                <img src={image} alt="No properties was found"/>
                                No properties was found.
                            </p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;