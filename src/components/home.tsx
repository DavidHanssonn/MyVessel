
import React, {useState,FC, ChangeEvent} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import searchIcon from "./icon/search.png"

const Home : FC = () => {

    const [getvalue, setgetvalue] = useState<string>("");   
    const [notFound, SetNotFound] = useState<boolean>(false);
    const [loadingVessel, SetLoadingVessel] = useState<boolean>(false);
    const [approved, setApproved] = useState<boolean>(false);
    const history = useHistory();

    const searchMME = (e : ChangeEvent<any>) => {
        setgetvalue(e.target.valueAsNumber);    
        if(e.target.valueAsNumber.toString().length === 9){
          setApproved(false);
        }
    }
    const {REACT_APP_APRSAPIKEY} = process.env;

    const getVessel = () => {
      if(getvalue.toString().length === 9) {
      setApproved(false);
      SetLoadingVessel(true);
      axios.get(`https://myvessel-corser.herokuapp.com/https://api.aprs.fi/api/get?name=${getvalue}&what=loc&apikey=${REACT_APP_APRSAPIKEY}&format=json`)
     
      .then(response => {
        if(response.data.found === 0) {
          SetNotFound(true)
          SetLoadingVessel(false);
        }else{
          history.push({
            pathname: '/map',
             state: {
                 vesseldata: [response.data],
             }
           })    
        }

      })
      .catch(err => console.error(err));
    } else{
      setApproved(true);
    }
    }

    return(
      <div>
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className="container">
          <h1>Search Vessel</h1>
          <div className="search-container">
              <input onChange={searchMME}  placeholder="Search for MMSI" type="number" />
              <button onClick={getVessel} disabled={approved}><img alt="searchicon" src={searchIcon}/></button>
              {loadingVessel && 
              <h1>Loading data...</h1>
              }
              <div className="warning">
                {notFound && 
                <h3>Sorry we couldn't find this signal</h3>
                }
                {approved && 
                <h3>Maritime mobile service identity's consists of nine digits.</h3>
                }
              </div>
          </div>
        </div>
   </div>
    );


}

export default Home