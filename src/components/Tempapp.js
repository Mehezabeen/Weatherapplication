import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState();
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ea309483dde6988cc876f1194753eb6b`;
            const response = await fetch(url);

            if (response.ok) {
                const resJson = await response.json();
                setCity(resJson.main);

                const currentDateTime = new Date();
                const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
                setDateTime(formattedDateTime);
            } else {
                setCity(null);
                setDateTime("");
            }
        };

        if (search) {
            fetchApi();
        } else {
            setCity(null);
            setDateTime("");
        }
    }, [search]);

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input
                        type="search"
                        value={search}
                        className="inputField"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {!city ? (
                    <p>No Data Found</p>
                ) : (
                    <div>
                        <div className="weather_info">
                            <h2 className="weather_location">
                                <i className="fa fa-street-view"></i>
                                {search}
                            </h2>
                            <h1 className="weather_temperature">{city.temp}°Cel</h1>
                            <h3 className="weather_min_max">
                                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
                            </h3>
                            <h4 className="weather_datetime">{dateTime}</h4>
                        </div>

                        <div className="wave-one"></div>
                        <div className="wave-two"></div>
                        <div className="wave-three"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Tempapp;
