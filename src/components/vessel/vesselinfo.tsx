import React, {FC, useState, useEffect} from 'react';
import questionlogo from '../icon/question-mark.svg';

interface IVessel{
  name:string,
  mmsi:number,
  imo:number,
  srccall?:string,
  date?:any,
  draught:number,
  length:number,
  width:number,
}


const VesselInfo : FC<IVessel> = (props : IVessel) => {  

    //Media query for phones 600px
  const [showMenu,SetShowMenu] = useState<boolean>(false)
  const PhoneInfo = () => {
   SetShowMenu(!showMenu)
  }

return(
    <div>
    <div className={`vesselInfo ${showMenu ? 'fullwidth' : ''}`}>
      <div className="vesselcontainer" >
    <h3>{props.name}</h3>
      <ul>
        <li><label>Last Update:</label> {props.date}</li>
        <li><label>MMSI:</label>{props.mmsi}</li>
        <li><label>IMO:</label>{props.imo}</li>
        <li><label>Call:</label>{props.srccall}</li>
      </ul>
      <h3>Specifications</h3>
      <ul>
        <li><label>Width:</label> {props.width}m</li>
        <li><label>Length:</label>{props.length}m</li>
        <li><label>Draught:</label>{props.draught}m</li>
      </ul>
     </div>
    </div>
    <button className="phoneInfo" onClick={PhoneInfo}><img src={questionlogo} alt="t" /></button>
    </div>
)


}


export default VesselInfo