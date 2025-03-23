import React,{useEffect} from 'react'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { getToken } from '../../services/LocalStorageService'
function Orders() {
  let { access_token } = getToken();
    const {userdata,isSuccess} = useGetLoggedUserQuery(access_token)
    useEffect(()=>{
      console.log(userdata)
    },[userdata])
  return (
    <div>Orders</div>
  )
}

export default Orders