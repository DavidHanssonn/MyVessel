import React, { useEffect, useRef, useState } from "react";
import { Link , useLocation} from "react-router-dom";
//import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './vessel.scss'
import VesselInfo from "./vesselinfo";
import Vesselspeed from "./vesselspeed";
import logo from '../icon/Group.svg';
import mapboxgl from "mapbox-gl/dist/mapbox-gl";


const styles : React.CSSProperties= {
  width: "100vw",
  height: "calc(100vh)",
  position: "absolute"
};

const VesselMap = () => {
 
  const { state } = useLocation();
  let vesseldata = state.vesseldata[0].entries[0];

  let latp = Number(vesseldata.lat);
  let lngp = Number(vesseldata.lng);
  let date = new Date(vesseldata.lasttime * 1000);

  const [map, setMap] = useState<any>(null);
  const mapContainer = useRef<any>(null);
  //console.log(vesseldata)

  const {REACT_APP_SECRETAPIMAP} = process.env;

    useEffect(() => {
    mapboxgl.accessToken = REACT_APP_SECRETAPIMAP;
    // eslint-disable-next-line import/no-webpack-loader-syntax
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
    const initializeMap = ({ setMap, mapContainer } : any) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
        center: [lngp, latp], // Reversed order 
        zoom: 5,
      });

      var el = document.createElement('div');
      el.className = 'marker';
      var textnode = document.createElement("div");
      textnode.className = 'pin';

      var pineffect = document.createElement("div");
      pineffect.className = 'pineffect'

      el.appendChild(textnode);
      el.appendChild(pineffect);
      
      map.addControl(new mapboxgl.NavigationControl());
      new mapboxgl.Marker(el)
      
      .setLngLat([lngp, latp])
      .addTo(map);
     
      map.on("load", () => {
    
      map.flyTo({
      center: [lngp, latp],
      zoom: 7,
      bearing: 0,
      speed: 0.6, // make the flying slow
      easing: function (fly :any) {
      return fly;
      },
      });
      
       setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
  <div>

    <Link to="/"><img alt="back-arrow" src={logo} className="backarrow"/></Link>
    <VesselInfo 
    name={vesseldata.name}
    mmsi={vesseldata.mmsi}
    imo={vesseldata.imo}
    date={date.toUTCString()}
    srccall={vesseldata.srccall}
    draught={vesseldata.draught}
    width={vesseldata.width}
    length={vesseldata.length}
    />

    <Vesselspeed 
    speed={vesseldata.speed}
    heading={vesseldata.heading}
    />


  <div ref={el => (mapContainer.current = el)} style={styles} />
  </div>
  );
};


export default VesselMap