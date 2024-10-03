import React, { useState } from 'react'
import { Country } from './Country';

const ShowCountryData = ({ country }) => {
    const [show, setShow] = useState(false);

    const handleShowButton = () => setShow(!show);

    if (show === false) {
        return (
            <button onClick={handleShowButton} >Show</button>
        )
    } else {
        return (
            <div>
                <button onClick={handleShowButton} >Hide</button>
                <Country key={country.cca3} country={country}/>
            </div>
        )
    }
}

export { ShowCountryData };