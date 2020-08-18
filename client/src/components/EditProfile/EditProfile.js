import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchProfile} from '../../actions'
import EditPostModal from '../EditRecipeModal/EditPostModal'
import Sidebar from "../Sidebar/Sidebar.js";
import routes from "../../routes.js";

const EditProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,profile} = state;
    const [sidebarMini,setSidebarMini] = useState(true)
    const [backgroundColor,setBackgroundColor] = useState('blue')

    useEffect(() =>{
        fetchProfile(username,dispatch)
        
    },[username])

      const divStyle = {
          margin:'8% 0 0 0'
      }

console.log("profile:")
console.log(profile)
return(
    <>
    {profile ? (
        <div style={divStyle}>
                <EditPostModal key={profile._id} id={profile._id} email={profile.email} profileName={profile.username} password={profile.password} />  
        </div>
            
        ) : (<div style={divStyle}>loading</div>)
    }
    </>)
}

export default EditProfile

