import React, {FC} from 'react';

interface Ispeed{
speed: number,
heading?:number,
}

const VesselInfo : FC<Ispeed> = (props : Ispeed) => {

    let number = props.speed;
    let cleannumber = Math.floor(number* 100) / 100; //2 decimals

return(
    <div className="vesselCourse">
    <div className="item"><span>Speed: {cleannumber}</span></div>
    <div className="item"><span>Heading: {props.heading}</span></div>
    </div>
)


}


export default VesselInfo

