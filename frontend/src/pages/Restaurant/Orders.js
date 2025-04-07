import React,{useEffect,useState} from 'react'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { getToken } from '../../services/LocalStorageService'
import Sidebar from "./Sidebar";
import { NavLink,Link,useLocation } from 'react-router-dom';
import axios from "axios";

function Orders() {
  let { access_token } = getToken();
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)

    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          if (data?.restaurant_id) {
            
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/restaurant/orders/${data?.restaurant_id}/`)
                setOrders(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
          }
        };

        fetchData();
    }, [data?.restaurant_id]);
    
  return (
    <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4><i class="bi bi-cart-check-fill"></i> All Orders  </h4>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((o, index) => (
                                        <tr key={index}>
                                            <th scope="row">#{o.oid}</th>
                                            <td>{o.full_name}</td>
                                            <td>{o.date}</td>
                                            <td>{o.order_status}</td>
                                            <td>
                                                <Link to={`/restaurant/orders/${o.oid}/`} className="btn btn-primary mb-1">
                                                    <i className="fas fa-eye" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    {orders < 1 &&
                                        <h5 className='mt-4 p-3'>No orders yet</h5>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Orders