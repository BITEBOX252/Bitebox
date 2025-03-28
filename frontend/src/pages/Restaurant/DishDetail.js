import axios from 'axios'
import { useParams } from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import CartID from '../plugins/CartID'
import { getToken } from '../../services/LocalStorageService'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { setUserToken } from '../../features/authSlice'
import { setUserInfo } from '../../features/userSlice'
import { useDispatch } from 'react-redux';


const DishDetail = () => {
    const dispatch = useDispatch();

    const [product,setProduct]= useState({})
    const [specification,setSpecification]= useState([])
    const [gallery,setGallery]= useState([])
    const [spiceLevel,setSpiceLevel]= useState([])
    const [portionSize,setPortionSize]= useState([])

    const [spiceLevelValue,setSpiceLevelValue]= useState("No spice level")
    const [portionSizeValue,setPortionSizeValue]= useState("No portion size")
    const [qtyValue,setQtyValue]= useState(1)
    const [priceByPortionSize,setPriceByPortionSize]= useState(0)
    const [restaurant, setRestaurant] = useState([])
    const [restaurantUser, setRestaurantUser] = useState([])

    const CartId= CartID()
    let { access_token } = getToken();
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)


    const params=useParams()

    useEffect(()=>{
        dispatch(setUserToken({ access_token: access_token }));
        if (data && isSuccess) {
        console.log("Data is this",data);
        
        dispatch(setUserInfo({email:data.email,name:data.name}))
        
    }
    console.log("Access Token is this",data);
    })
    useEffect(()=>  {
        
        axios.get(`http://127.0.0.1:8000/api/store/dish/${params.slug}`).then((res)=>{
      
        console.log(res.data);
        
        setProduct(res.data)
        setSpecification(res.data?.specification)
        setGallery(res.data?.gallery)
        setSpiceLevel(res.data?.spice_level)
        setPortionSize(res.data?.portion_size)
        setRestaurant(res.data.restaurant);
        setRestaurantUser(res.data.restaurant.name);
        })
    },[])
    console.log(spiceLevel);
    console.log(portionSize);
    

    const portionSizeHandler= async (e)=>{
        e.preventDefault() 
        const portionSizeName=e.target.closest(".size_button").parentNode.querySelector(".size_name")
        // console.log(colorName.value)
        setPortionSizeValue(portionSizeName.value)
        try {
            
            const response = await axios.get(`http://127.0.0.1:8000/api/store/dish/${params.slug}`, {
                params: { portion_size: portionSizeName.value }  // Pass the selected size as a query parameter
            }).then((res)=>{
                console.log(res)
                // console.log(res.data);
                // console.log(res.data?.price_by_size);
                
                setPriceByPortionSize(res.data?.price_by_portion_size)
                setProduct(res.data)
                setSpecification(res.data?.specification)
                setGallery(res.data?.gallery)
                setSpiceLevel(res.data?.spice_level)
                setPortionSize(res.data?.portion_size)
    
            })
        } catch (error) {
            console.log(error);
        }
    }

    const spiceLevelHandler=(e)=>{
        e.preventDefault()
     
        // const spiceLevel=e.target.closest(".color_button").parentNode.querySelector(".color_name")
        const spiceLevel=e.target.closest(".spice_level_button").parentNode.querySelector(".spice_level")
        // console.log(colorName.value)
        setSpiceLevelValue(spiceLevel.value)
        
    }

    const qtyhandler=(e)=>{
        setQtyValue(e.target.value)
    }


    const carthandler= async ()=>{
        // console.log(product.id);
        // console.log(product.price);
        // console.log(product.shipping_amount);
        // console.log(qtyValue);
        // console.log(colorValue);
        // console.log(sizeValue);
        // console.log(currAddress.country);
        // console.log(userData.user_id);
        // console.log(CartId);
        try {
        const formdata=new FormData()
        formdata.append("dish_id",product.id)
        formdata.append("user_id",data?.id)
        formdata.append("qty",qtyValue)
        formdata.append("price",product.price)
        formdata.append("shipping_amount",product.shipping_amount)
        // formdata.append("country",currAddress.country)
        formdata.append("country","undefined")
        formdata.append("portionSize",portionSizeValue)
        formdata.append("spiceLevel",spiceLevelValue)
        formdata.append("cart_id",CartId)

        const response= await axios.post(`http://127.0.0.1:8000/api/store/cart/`,formdata)
        console.log(response);

        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <div>
        <main className="mb-4 mt-4">
    <div className="container">
        {/* Section: Product details */}
        <section className="mb-9">
            <div className="row gx-lg-5">
                <div className="col-md-6 mb-4 mb-md-0">
                    {/* Gallery */}
                    <div className="">
                        <div className="row gx-2 gx-lg-3">
                            <div className="col-12 col-lg-12">
                                <div className="lightbox">
                                    <img
                                        src={product.image}
                                        style={{
                                            width: "100%",
                                            height: 500,
                                            objectFit: "cover",
                                            borderRadius: 10
                                        }}
                                        alt="Gallery image 1"
                                        className="ecommerce-gallery-main-img active w-100 rounded-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 d-flex">
                            {gallery.map((g,index)=>(

                            <div className="p-3" key={index} >
                                <img
                                    src={g.image}

                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                        borderRadius: 10
                                    }}
                                    alt="Gallery image 1"
                                    className="ecommerce-gallery-main-img active w-100 rounded-4"
                                   
                                />
                            </div>
                            ))}
                           
                        </div>
                    </div>
                    {/* Gallery */}
                </div>
                <div className="col-md-6 mb-4 mb-md-0">
                    {/* Details */}
                    <div>
                        <h1 className="fw-bold mb-3">{product.title}</h1>
                        <div className="d-flex text-primary just align-items-center">
                            <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                                <li>
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                </li>

                                <li style={{ marginLeft: 10, fontSize: 13 }}>
                                    <a href="" className="text-decoration-none">
                                        <strong className="me-2">4/5</strong>(2 reviews)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h5 className="mb-3">
                            <s className="text-muted me-2 small align-middle">${product.old_price}</s> 
                            <span className="align-middle">${priceByPortionSize > 0 ? priceByPortionSize : product.price}</span> 
                        </h5>
                        <p className="text-muted">
                            {product.description}
                        </p>
                        <div className="table-responsive">
                            <table className="table table-sm table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <th className="ps-0 w-25" scope="row">
                                            <strong>Category</strong>
                                        </th>
                                        <td>{product.category?.title}</td>
                                    </tr>
                                    {specification.map((s,index)=>(

                                    <tr >
                                        <th className="ps-0 w-25" scope="row">
                                            <strong>{s.title}</strong>
                                        </th>
                                        <td>{s.content}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <hr className="my-5" />
                        <div action="">
                            <div className="row flex-column">
                                {/* Quantity */}
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="typeNumber"><b>Quantity</b></label>
                                        <input
                                            type="number"
                                            id="typeNumber"
                                            className="form-control quantity"
                                            min={1}
                                            value={qtyValue}
                                            onChange={qtyhandler}
                                        />
                                    </div>
                                </div>
                                {portionSize.length>0 &&
                                <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="typeNumber"><b>Portion Size:</b>{portionSizeValue} </label>
                                </div>
                                <div className='d-flex'>
                                {portionSize.map((s,index)=>(
                                    <div  className='me-2' key={index}>
                                        <input type="hidden" className='size_name' value={s.size_name} />
                                        <button type='button' onClick={portionSizeHandler}  className='btn btn-secondary size_button'>{s.size_name}</button>
                                    </div>
                                ))} 
                                    
                                </div>
                            </div>
                                 } 
                                {/* Size */}
                                

                                {/* Spice Level */}
                                {spiceLevel.length>0 &&
                                <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="typeNumber"><b>Level:</b> <span>{spiceLevelValue}</span></label>
                                </div>
                                <div className='d-flex'>
                                {spiceLevel.map((s,index)=>(
                                    <div >
                                        <input type="hidden" className='spice_level' value={s.level_name} />
                                        {/* <input type="hidden" className='color_image' value={1} /> */}
                                        <button type='button' onClick={spiceLevelHandler}  className='btn btn-secondary me-2 spice_level_button'>{s.level_name}</button>
                                        
                                        {/* <button type='button' className='btn p-3 me-2 color_button'onClick={colorHandler}  style={{ background: `${c.color_code}` }}></button> */}
                                    </div>
                                    
                                 ))} 
                                </div>
                                <hr />
                            </div>
                               } 
                                

                            </div>
                            <button type="button" className="btn btn-primary btn-rounded me-2"  onClick={carthandler}  >
                                <i className="fas fa-cart-plus me-2" /> Add to cart
                            </button>
                            <button href="#!" type="button" className="btn btn-danger btn-floating" data-mdb-toggle="tooltip" title="Add to wishlist">
                                <i className="fas fa-heart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                    Specifications
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                    Vendor
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" >
                    Review
                </button>
            </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex={0}
            >
                <div className="table-responsive">
                    <table className="table table-sm table-borderless mb-0">
                    <tbody>
                                    <tr>
                                        <th className="ps-0 w-25" scope="row">
                                            <strong>Category</strong>
                                        </th>
                                        <td>{product.category?.title}</td>
                                    </tr>
                                    {specification.map((s,index)=>(

                                    <tr >
                                        <th className="ps-0 w-25" scope="row">
                                            <strong>{s.title}</strong>
                                        </th>
                                        <td>{s.content}</td>
                                    </tr>
                                      ))} 
                                </tbody>
                    </table>
                </div>
            </div>
            <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex={0}
            >
                <div className="card mb-3" style={{ maxWidth: 400 }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={restaurant.image}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover"
                                }}
                                alt="User Image"
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{restaurantUser}</h5>
                                <p className="card-text">{restaurant.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabIndex={0}
            >
                <div className="container mt-5">
                    <div className="row">
                        {/* Column 1: Form to create a new review */}
                        <div className="col-md-6">
                            <h2>Create a New Review</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Rating
                                    </label>
                                    <select name="" className='form-select' id="">
                                        <option value="1">1 Star</option>
                                        <option value="1">2 Star</option>
                                        <option value="1">3 Star</option>
                                        <option value="1">4 Star</option>
                                        <option value="1">5 Star</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reviewText" className="form-label">
                                        Review
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="reviewText"
                                        rows={4}
                                        placeholder="Write your review"
                                        defaultValue={""}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                        {/* Column 2: Display existing reviews */}
                        <div className="col-md-6">
                            <h2>Existing Reviews</h2>
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                            alt="User Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">User 1</h5>
                                            <p className="card-text">August 10, 2023</p>
                                            <p className="card-text">
                                                This is a great product! I'm really satisfied with
                                                it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                            alt="User Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">User 2</h5>
                                            <p className="card-text">August 15, 2023</p>
                                            <p className="card-text">
                                                The quality of this product exceeded my
                                                expectations!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* More reviews can be added here */}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="tab-pane fade"
                id="pills-disabled"
                role="tabpanel"
                aria-labelledby="pills-disabled-tab"
                tabIndex={0}
            >
                <div className="container mt-5">
                    <div className="row">
                        {/* Column 1: Form to submit new questions */}
                        <div className="col-md-6">
                            <h2>Ask a Question</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="askerName" className="form-label">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="askerName"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="questionText" className="form-label">
                                        Question
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="questionText"
                                        rows={4}
                                        placeholder="Ask your question"
                                        defaultValue={""}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit Question
                                </button>
                            </form>
                        </div>
                        {/* Column 2: Display existing questions and answers */}
                        <div className="col-md-6">
                            <h2>Questions and Answers</h2>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">User 1</h5>
                                    <p className="card-text">August 10, 2023</p>
                                    <p className="card-text">
                                        What are the available payment methods?
                                    </p>
                                    <h6 className="card-subtitle mb-2 text-muted">Answer:</h6>
                                    <p className="card-text">
                                        We accept credit/debit cards and PayPal as payment
                                        methods.
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">User 2</h5>
                                    <p className="card-text">August 15, 2023</p>
                                    <p className="card-text">How long does shipping take?</p>
                                    <h6 className="card-subtitle mb-2 text-muted">Answer:</h6>
                                    <p className="card-text">
                                        Shipping usually takes 3-5 business days within the US.
                                    </p>
                                </div>
                            </div>
                            {/* More questions and answers can be added here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    </div>

  )
}

export default DishDetail