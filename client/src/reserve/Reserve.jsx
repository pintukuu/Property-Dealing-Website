import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import './Reserve.css'
export const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`/props/bps/${hotelId}`)
    // console.log(data);
    const [selectedPlots, SetSelectedPlots] = useState([]);
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        SetSelectedPlots(checked ? [...selectedPlots, value] : selectedPlots.filter(item => item !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all()
        } catch (err) {

        }

    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rclose" onClick={() => setOpen(false)} />
                <span>Select your Plot</span>
                {data.map(item => (
                    <div className="rInfo">
                        <div className="rItem">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                            <div className="rPrice"> Price :{item.price}</div>
                            {item.plotNumbers.map(plotNumber => (
                                <div className="room">
                                    <label>{plotNumber.number}</label>
                                    <input type="checkbox" value={plotNumber._id} onChange={handleSelect} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Buy Now</button>
            </div>
        </div>
    )
}
