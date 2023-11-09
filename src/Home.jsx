import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { BreweryDetails } from './components/BreweryDetails';

export const Home = () => {

  const [searchType, setSearchType] = useState('by_city'); // Default to search by city
  const [searchValue, setSearchValue] = useState('');
  const [breweries, setBreweries] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const searchBreweries = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/breweries?${searchType}=${searchValue}`
      );
      setBreweries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  useEffect(() => {
    if (searchValue) {
      searchBreweries();
    }
  }, [searchType, searchValue]);

  return (
    <div>
      <div className="user">
            {user && (
            <>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || ""} width="20" height="20" />
                <button className="signout" onClick={signUserOut}>
                 Log Out
                </button>
            </>
            )}
        </div>

      {/* <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/auth">Login</Link>
        ) : (
          <Link to="/createpost">Create Post</Link>
        )}
      </div> */}
      <div>
        <label>
          Search by:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="by_city">City</option>
            <option value="by_name">Name</option>
            <option value="by_type">Type</option>
          </select>
        </label>
      </div>

      <input
       type="text" 
       placeholder={`Enter ${searchType === 'by_type' ? 'Brewery Type' : searchType.charAt(3) === '_' ? searchType.slice(3) : searchType.charAt(3) + searchType.slice(4)}`}
       value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={searchBreweries}>Search</button>
      {/* <button onClick={searchByName}>Search by name</button>
      <button onClick={searchByType}>Search by type</button> */}
      
        {breweries.map((brewery) => (
          <div className='card'>
            <p>Name: {brewery.name}</p>
            <p>Address: {brewery.address_1}</p>
            <p>Phone: {brewery.phone}</p>
            <a href={brewery.website_url}>Link</a>
            <p>City: {brewery.city}</p>
            <p>State: {brewery.state}</p>
            <BreweryDetails brewery={brewery} />
          </div>
        ))}
    </div>
  );
};
