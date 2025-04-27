// import React, { useEffect, useState } from 'react';
// import { useParams,Link } from 'react-router-dom';
// import axios from 'axios';

// const RestaurantDetail = () => {
//   const { id } = useParams();  // Get the restaurant ID from URL
//   const [dishes, setDishes] = useState([]);  // State for storing dishes
//       const [restaurant, setRestaurant] = useState([])
  
//   useEffect(() => {
//     // Fetch dishes for the restaurant
//     axios.get(`ec2-51-20-114-152.eu-north-1.compute.amazonaws.com/api/store/dishes/`, {
//       params: { restaurant_id: id }
//     })
//     .then(response => {
//       setDishes(response.data);  // Set the fetched dishes
//       console.log(response.data);
      
//     })
//     .catch(error => {
//       console.error("Error fetching dishes:", error);
//     });
//   }, [id]);
//   useEffect(()=>  {
          
//           axios.get(`ec2-51-20-114-152.eu-north-1.compute.amazonaws.com/api/store/dish/${dishes?.slug}`).then((res)=>{
        
//           console.log(res.data);
          
          
//           setRestaurant(res.data.restaurant);
//           })
//       },[dishes])

//   return (
//     <div>
//       <h1 className="mb-5 mt-5 text-center">Dishes of Restaurant {id}</h1>
//       <div className="row">
//         {dishes.map((dish, index) => (
//           <div key={index} className="col-lg-4 col-md-12 mb-4">
//             <div className="card">
//               <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
//                 <Link to={`/dishdetail/${dish.slug}`}><img src={dish.image} className="w-100" /></Link>
//               </div>
//               <div className="card-body">
//                 <h5 className="card-title mb-3">{dish.title}</h5>
//                 <p className="card-text">{dish.description}</p>
//                 <p className="card-text">Price: {dish.price}</p>
//               </div>
//               <div className="mt-5 p-4 bg-light rounded shadow w-75 text-center">
//         <h3 className="mb-3">Restaurant Information</h3>
//         <p><strong>Phone:</strong> {restaurant.phone_number}</p>
//         <p><strong>Name:</strong> {restaurant.Name}</p>
//         <p><strong>Address:</strong> {restaurant.address}</p>
//       </div>
    
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantDetail;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetail = () => {
  const { id } = useParams();  // Get the restaurant ID from URL
  const [dishes, setDishes] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Step 1: Fetch dishes
    axios.get(`ec2-51-20-114-152.eu-north-1.compute.amazonaws.com/api/store/dishes/`, {
      params: { restaurant_id: id }
    })
    .then(response => {
      setDishes(response.data);
      console.log("Fetched Dishes:", response.data);
    })
    .catch(error => {
      console.error("Error fetching dishes:", error);
    });
  }, [id]);

  useEffect(() => {
    // Step 2: When dishes are fetched, get restaurant info using the first dish's slug
    if (dishes.length > 0) {
      const slug = dishes[0].slug;  // Get slug from the first dish
      axios.get(`ec2-51-20-114-152.eu-north-1.compute.amazonaws.com/api/store/dish/${slug}`)
        .then(response => {
          console.log("Fetched Restaurant:", response.data);
          setRestaurant(response.data);
        })
        .catch(error => {
          console.error("Error fetching restaurant:", error);
        });
    }
  }, [dishes]);  // This runs after dishes are updated

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <h1 className="mb-5 mt-5 text-center">Dishes of {restaurant?.restaurant?.name}</h1>


      {restaurant && (
        <div className="mt-5 mb-5 p-4 bg-light rounded shadow w-75 text-center">
          <h3 className="mb-3">Restaurant Information</h3>
          <p><strong>Phone:</strong> {restaurant?.restaurant?.phone_number}</p>
          <p><strong>Name:</strong> {restaurant?.restaurant?.name}</p>
          <p><strong>Address:</strong> {restaurant?.restaurant?.address}</p>
        </div>
      )}
      <div className="row justify-content-center w-100">
        {dishes.map((dish, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
            <div className="card shadow" style={{ width: "18rem" }}>
              <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                <Link to={`/dishdetail/${dish.slug}`}>
                  <img src={dish.image} className="card-img-top" alt={dish.title} />
                </Link>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mb-2">{dish.title}</h5>
                <p className="card-text small">{dish.description}</p>
                <p className="card-text fw-bold">Price: ${dish.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restaurant Info Section */}
      
    </div>
  );
};

export default RestaurantDetail;

