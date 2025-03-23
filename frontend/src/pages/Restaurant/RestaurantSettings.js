import Sidebar from './Sidebar'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { getToken } from '../../services/LocalStorageService'

function RestaurantSettings() {
    // const [profileData, setProfileData] = useState({ 'full_name': '', 'mobile': '', 'email': '', 'about': '', 'country': '', 'city': '', 'state': '', 'address': '', 'p_image': '', });
    const [profileData, setProfileData] = useState([]);
      const [vendorData, setVendorData] = useState([]);
      const [vendorImage, setVendorImage] = useState("");
      const [profileImage, setprofileImage] = useState("");


      let { access_token } = getToken();
        const {data,isSuccess} = useGetLoggedUserQuery(access_token)
      const fetchProfileData = async () => {
          try {
              axios.get(`http://127.0.0.1:8000/api/restaurant/profile-update/${data.id}/`).then((res) => {
              setProfileData(res.data)
            console.log(res.data);
        //     setProfileData({
        //         'full_name': res.data?.full_name,
        //         'email': res.data.user.email,
        //         'phone': res.data.user.phone,
        //         'about': res.data.about,
        //         'country': res.data.country,
        //         'city': res.data.city,
        //         'state': res.data.state,
        //         'address': res.data.address,
        //         'p_image': res.data.image,
        //       })
              setprofileImage(res.data.image)
          })
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      useEffect(() => {
        fetchProfileData();
      
        
      }, [])
      const handleInputChange = (event) => {
        setProfileData({
          ...profileData,
          [event.target.name]: event.target.value
        })
      };
    
      const handleFileChange = (event) => {
        setProfileData({
          ...profileData,
          [event.target.name]: event.target.files[0]
        })
      }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true)
    
        const res = await  axios.get(`http://127.0.0.1:8000/api/restaurant/profile-update/${data.id}/`);
    
        const formData = new FormData();
        if (profileData.image && profileData.image !== res.data.image) {
          formData.append('image', profileData.image);
        }
        formData.append('full_name', profileData.full_name);
        formData.append('about', profileData.about);
        // formData.append('country', profileData.country);
        // formData.append('city', profileData.city);
        // formData.append('state', profileData.state);
        // formData.append('address', profileData.address);
    
        try {
          axios.patch(`http://127.0.0.1:8000/api/restaurant/profile-update/${data.id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          fetchProfileData()
          
    
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };
      
  return (
    <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    <Sidebar/>

    <div className="col-md-9 col-lg-10 main mt-4">
      <div className="container">
        <div className="main-body">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                Shop
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={profileImage}
                          style={{ width: 160, height: 160, objectFit: "cover" }}
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                        />
                        <div className="mt-3">
                          <h4 className="text-dark">{profileData.full_name}</h4>
                          <p className="text-secondary mb-1">{profileData.about}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form
                        className="form-group"
                        method="POST"
                        noValidate=""
                        encType="multipart/form-data"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="row text-dark">
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Profile Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              id=""
                              onChange={handleFileChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              
                              id=""
                              value={profileData.full_name}
                              onChange={handleInputChange}
                              name="full_name"
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                              value={profileData?.user?.email}
                              readOnly

                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                              value={profileData?.user?.phone}
                              readOnly
                            />
                          </div>
                          
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              About Me
                            </label>
                            <textarea
                              onChange={handleInputChange}
                              name="about"
                              className="form-control"
                              
                              id=""
                              value={profileData.about}
                            ></textarea>
                          </div>
                          <div className="col-lg-6 mt-4 mb-3">
                            <button className="btn btn-success" type="submit">
                              Update Profile <i className="fas fa-check-circle" />{" "}
                            </button>
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
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg"
                          style={{ width: 160, height: 160, objectFit: "cover" }}
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                        />
                        <div className="mt-3">
                          <h4 className="text-dark">Desphixs</h4>
                          <p className="text-secondary mb-1">We sell cloths here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form
                        className="form-group"
                        method="POST"
                        noValidate=""
                        encType="multipart/form-data"
                      >
                        <div className="row text-dark">
                          <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="mb-2">
                              Shop Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              id=""
                            />
                          </div>
                          <div className="col-lg-12 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Full Name
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
                              Email
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
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                            />
                          </div>
                          <div className="col-lg-6 mt-4 mb-3">
                            <button className="btn btn-success" type="submit">
                              Update Shop <i className="fas fa-check-circle" />{" "}
                            </button>
                            <button className="btn btn-primary" type="submit">
                              View Shop <i className="fas fa-shop" />{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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

export default RestaurantSettings