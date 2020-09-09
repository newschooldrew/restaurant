import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchProfile} from '../../actions'
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import Sidebar from "../Sidebar/Sidebar.js";
import routes from "../../routes.js";

const EditProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,profile} = state;
    
    useEffect(() =>{
        fetchProfile(username,dispatch)
        console.log("profile:")
        console.log(profile) 
    },[username])

      const divStyle = {
          margin:'8px 0 0 0'
      }

return(
    <>
    {profile ? (
        <div style={divStyle}>
                <EditProfileModal key={profile._id} id={profile._id} email={profile.email} phoneNumber={profile.phoneNumber} profileName={profile.username} password={profile.password} />  
        </div>
            
        ) : (<div style={divStyle}>loading</div>)
    }
    </>)
}

export default EditProfile

