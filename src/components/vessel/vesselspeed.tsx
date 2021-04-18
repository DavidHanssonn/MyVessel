import React, {FC} from 'react';

interface Ispeed{
speed?:any,
heading?:number,
}

const VesselInfo : FC<Ispeed> = (props : Ispeed) => {

return(
    <div className="vesselCourse">
    <div className="item"><span>Speed: {props.speed.toFixed(2)}</span></div>
    <div className="item"><span>Heading: {props.heading}</span></div>
    </div>
)


}


export default VesselInfo

