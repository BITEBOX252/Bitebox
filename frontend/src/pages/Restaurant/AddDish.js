import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { getToken } from '../../services/LocalStorageService'
import Sidebar from './Sidebar';
import axios from 'axios';
function AddDish() {
    let { access_token } = getToken();
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)
    const [product, setProduct] = useState({
        title: '',
        image: null,
        description: '',
        category: '',
        tags: '',
        // brand: '',
        price: '',
        old_price: '',
        shipping_amount: '',
        stock_qty: '',
        restaurant:data?.restaurant_id
    });
    const [specifications, setSpecifications] = useState([{ title: '', content: '' }]);
    const [spiceLevels, setSpiceLevels] = useState([{ level_name: '' }]);
    const [sizes, setSizes] = useState([{ name: '', price: 0.00 }]);
    const [gallery, setGallery] = useState([{ image: null }]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleAddMore = (setStateFunction) => {
        setStateFunction((prevState) => [...prevState, {}]);
    };


    const handleRemove = (index, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState];
            newState.splice(index, 1);
            return newState;
        });
    };
    const handleInputChange = (index, field, value, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState];
            newState[index][field] = value;
            return newState;
        });
    };

    const handleImageChange = (index, event, setStateFunction) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setStateFunction((prevState) => {
                    const newState = [...prevState];
                    newState[index].image = { file, preview: reader.result };
                    return newState;
                });
            };

            reader.readAsDataURL(file);
        } else {
            // Handle the case when no file is selected
            setStateFunction((prevState) => {
                const newState = [...prevState];
                newState[index].image = null; // Set image to null
                newState[index].preview = null; // Optionally set preview to null
                return newState;
            });
        }
    };

    const handleProductInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    };


    const handleProductFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProduct({
                    ...product,
                    image: {
                        file: event.target.files[0],
                        preview: reader.result
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            axios.get('http://127.0.0.1:8000/api/store/categories/').then((res) => {
                setCategory(res.data)
                console.log(res.data)
            })
        }
        fetchCategory()
    }, [])
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left h-100">
    {/* Sidebar Here */}
    <Sidebar/>

    <div className="col-md-9 col-lg-10 main mt-4">
      <div className="container">
        <div className="main-body">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Product Details</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form
                        className="form-group"
                        method="POST"
                        noValidate=""
                        encType="multipart/form-data"
                      >
                        <div className="row text-dark">
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Product Thumbnail
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              onChange={handleProductFileChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={product.title || ""}
                              onChange={handleProductInputChange}
                              id=""
                            />
                          </div>
                          <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="mb-2">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id=""
                              cols={30}
                              rows={10}
                              defaultValue={""}
                              name="description"
                              value={product.description || ""}
                              onChange={handleProductInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Category
                            </label>
                            <select
                              className="select form-control"
                              id=""
                              name="category"
                              value={product.category || ''}
                              onChange={handleProductInputChange}
                            >
                              <option value="">- Select -</option>
                              {category?.map((c,index)=>(

                              <option key={index} value={c.id}>{c.title}</option>
                              ))}
                            </select>
                          </div>
                          {/* <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Brand
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                            />
                          </div> */}
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Sale Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="price"
                              value={product.price || ""}
                              onChange={handleProductInputChange}
                              id=""
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Regular Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="old_price"
                              value={product.old_price || ""}
                              onChange={handleProductInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Shipping Amount
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="shipping_amount"
                              value={product.shipping_amount || ""}
                              onChange={handleProductInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Stock Qty
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="stock_qty"
                              value={product.stock_qty || ""}
                              onChange={handleProductInputChange}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Dish Image</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                        {gallery.map((item,index)=>(

                    
                            <div className="row text-dark">
                        <div className="col-lg-6 mb-2">
                            {item.image && (

                            <img src={item.image.preview} style={{height:"200px",width:"100%",objectFit:"cover",borderRadius:"10px"}}/>
                            )}
                            {!item.image && (

                            <img src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" style={{height:"200px",width:"100%",objectFit:"cover",borderRadius:"10px"}}/>
                            )}
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="" className="mb-1">Dish Image</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e)=>handleImageChange(index,e,setGallery)}
                          />
                        </div>
                        <div className="col-lg-3">
                            <button onClick={()=>handleRemove(index,setGallery)} className="btn btn-danger mt-4">
                              Remove
                            </button>
                        </div>
                      </div>
                            ))}

                            {gallery < 1 &&
                              <h4>No Images Selected</h4>
                            }
                      <button onClick={()=>handleAddMore(setGallery)} className="btn btn-primary mt-5">
                        <i className="fas fa-plus" /> Add Image
                      </button>
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
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Specifications</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      {specifications.map((s,index)=>(

                      <div className="row text-dark">
                        <div className="col-lg-5">
                          <label htmlFor="" className="mb-1">
                            Title
                          </label>
                          <input
                          value={s.title || ''}
                            type="text"
                            className="form-control"
                            onChange={(e)=>handleInputChange(index,'title',e.target.value,setSpecifications)}
                          />
                        </div>
                        <div className="col-lg-5">
                          <label  htmlFor="" className="mb-1">
                            Content
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e)=>handleInputChange(index,'content',e.target.value,setSpecifications)}
                          value={s.content || ''}
                            
                          />
                        </div>
                        <div className="col-lg-2">
                        <button onClick={()=>handleRemove(index,setSpecifications)}  className="btn btn-danger mt-4">
                              Remove
                            </button>
                        </div>
                      </div>
                      ))}
                      {specifications < 1 && 
                      <h4>No specifications added</h4>
                      }
                      <button onClick={()=>handleAddMore(setSpecifications)} className="btn btn-primary mt-5">
                        <i className="fas fa-plus" /> Add Specifications
                      </button>
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
            >
              {/* <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Size</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row text-dark">
                        <div className="col-lg-6 mb-2">
                          <label htmlFor="" className="mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            id=""
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label htmlFor="" className="mb-2">
                            Content
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary mt-5">
                        <i className="fas fa-plus" /> Add Specifications
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-size"
              role="tabpanel"
              aria-labelledby="pills-size-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Size</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      {sizes.map((s,index)=>(

                      <div className="row text-dark">
                        <div className="col-lg-5">
                          <label htmlFor="" className="mb-1">
                            Size
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            placeholder="XXL"
                            id=""
                            onChange={(e)=>handleInputChange(index,'title',e.target.value,setSizes)}
                            value={s.title || ''}
                          />
                        </div>
                        <div className="col-lg-5">
                          <label htmlFor="" className="mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            placeholder="$20"
                            className="form-control"
                            name=""
                            id=""
                            onChange={(e)=>handleInputChange(index,'price',e.target.value,setSizes)}
                            value={s.price || ''}
                          />
                        </div>
                        <div  className="col-lg-2">
                        <button onClick={()=>handleRemove(index,setSizes)}  className="btn btn-danger mt-4">
                              Remove
                            </button>
                        </div>

                      </div>
                      ))}
                      {sizes < 1 && 
                       <h4>
                        No sizes selected
                       </h4>

                      }
                      <button onClick={()=>handleAddMore(setSizes)} className="btn btn-primary mt-5">
                        <i className="fas fa-plus" /> Add Size
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-color"
              role="tabpanel"
              aria-labelledby="pills-color-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <h4 className="mb-4">Color</h4>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      {spiceLevels.map((s,index)=>(

                      <div className="row text-dark">
                        <div className="col-lg-5">
                          <label htmlFor="" className="mb-1">
                            Spice Level
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            placeholder="BBQ"
                            id=""
                            onChange={(e)=>handleInputChange(index,'level',e.target.value,setSpiceLevels)}
                            value={s.level || ''}
                          />
                        </div>
                        <div className="col-lg-5">
                          <label htmlFor="" className="mb-1">
                            Price
                          </label>
                          <input
                            type="text"
                            placeholder="$2"
                            className="form-control"
                            name=""
                            id=""
                            onChange={(e)=>handleInputChange(index,'price',e.target.value,setSpiceLevels)}
                            value={s.price || ''}
                          />
                        </div>
                        <div  className="col-lg-2">
                        <button onClick={()=>handleRemove(index,setSpiceLevels)}  className="btn btn-danger mt-4">
                              Remove
                            </button>
                        </div>
                      </div>
                      ))}
                      {spiceLevels < 1 && 
                       <h4>
                        No level added
                       </h4>

                      }
                      <button onClick={()=>handleAddMore(setSpiceLevels)}  className="btn btn-primary mt-5">
                        <i className="fas fa-plus" /> Add Level
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul
                className="nav nav-pills mb-3 d-flex justify-content-center mt-5"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Basic Information
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Gallery
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-size-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-size"
                    type="button"
                    role="tab"
                    aria-controls="pills-size"
                    aria-selected="false"
                  >
                    Size
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-color-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-color"
                    type="button"
                    role="tab"
                    aria-controls="pills-color"
                    aria-selected="false"
                  >
                    Spice Level
                  </button>
                </li>
              </ul>
              <div className="d-flex justify-content-center mb-5">
                <button className="btn btn-success w-50">
                  Add Dish <i className="fa fa-check-circle" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default AddDish