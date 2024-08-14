import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState(resList); //whatever i want to update i will pass inside setListOfRestraunt

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => { //Its a callback function , this fun will be call after clicking on that button
            const filteredList = listOfRestaurants.filter( //As soon as my state variable(listOfRestaurants) changes it(hooks) will automatically refresh our component
              (res) => res.data.avgRating > 4
            );
            setListOfRestraunt(filteredList); //if i want to pass filteredList inside setListOfRestraunt
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;


//Hooks - useState - Whenever a state variable updates react re-renders the component