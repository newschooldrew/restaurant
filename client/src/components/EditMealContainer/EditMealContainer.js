import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals} from '../../actions'
import Table from "../Table/Table.js";

const EditMealContainer = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    console.log("meals:")
    console.log(allMeals)

    useEffect(() =>{
        fetchAllMeals(dispatch)
        
    },[username])

    const divStyle = {
        margin: '8% 0 0 0',
        overflow:'scroll'
      };

    return (
        <div style={divStyle}>
                {allMeals && allMeals.map((meal,i) =>{
                    console.log(meal[i])
                    return(
                        <div>
                        <Table dataTable={allMeals} />
                        </div>
                )}
            )}
        </div>
    )
}

export default EditMealContainer

