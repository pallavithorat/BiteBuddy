import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered",listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() =>{
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();

    //console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

    setListOfRestraunt(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
  }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );

    const { loggedInUser, setUserName } = useContext(UserContext);






  return listOfRestaurants && listOfRestaurants.length === 0 ? (
    <Shimmer />
    ):(
    <div className="body">
      <div className="filter flex">

      <div className="search m-4 p-4">
          <input
            type="text"
            
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
        <button 
          className="px-4 py-2 bg-gray-100 rounded-lg"
          onClick={() => { //Its a callback function , this fun will be call after clicking on that button
            const filteredList = listOfRestaurants.filter( //As soon as my state variable(listOfRestaurants) changes it(hooks) will automatically refresh our component
              (res) => res.info.avgRating > 4
            );//whatever i want to update i will pass inside setListOfRestraunt
            setListOfRestraunt(filteredList); //if i want to pass filteredList inside setListOfRestraunt
          }}
        >
          Top Rated Restaurants
        </button>

      </div>

      <div className="search m-4 p-4 flex items-center">
          <label>UserName : </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

      
      </div>
      <div className="flex flex-wrap ">
        {filteredRestaurant.map((restaurant) => (
         <Link
         key={restaurant.info.id}
         to={"/restaurants/" + restaurant.info.id}
       >


            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
       </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;







//Hooks - useState - Whenever a state variable updates react re-renders the component