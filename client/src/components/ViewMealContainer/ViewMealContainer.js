import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals} from '../../actions'
import Table from "../Table/Table.js";

const ViewMealContainer = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    console.log("meals:")
    console.log(allMeals)

    useEffect(() =>{
        fetchAllMeals(dispatch)
        
    },[username])

    const divStyle = {
        margin: '8% 0 0 0'
      };

    return (
        <div style={divStyle}>
            {allMeals && (
                <Table dataTable={allMeals} />
                )
            }
        </div>
    )
}

export default ViewMealContainer

