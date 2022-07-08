import React from "react";
import NavigationBar from "../components/NavigationBar";
import "./Home.css";
import Restaurants from "../components/Restaurants";

export default function Home() {

    const [query, setQuery] = React.useState(null);

    const handleSearch = value => {
        setQuery(value);
    }

    return <> 
        <NavigationBar onSearch={handleSearch}/>
        <div className="home-page">
            <Restaurants query={query}/>
        </div>
    </>;
}