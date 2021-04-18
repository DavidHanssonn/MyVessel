import React, {FC} from 'react';

interface Ispeed{
speed?:number,
heading?:number,
}

const VesselInfo : FC<Ispeed> = (props : Ispeed) => {

return(
    <div className="vesselCourse">
    <div><span>Speed: {props.speed}</span></div>
    <div><span>Heading: {props.heading}</span></div>
    </div>
)


}


export default VesselInfo

