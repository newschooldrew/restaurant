import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals} from '../../actions'
import EditTable from '../EditTable/EditTable_v2'

const EditMealContainer = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    console.log("allMeals:")
    console.log(typeof allMeals)
    // let res;
    // res = Object.keys(allMeals).map(key =>[key,allMeals[key]])
    // res = Object.entries(allMeals)
    {allMeals && allMeals.map(meal =>{
        console.log(meal)
    })}
    // console.log(res)

    useEffect(() =>{
        fetchAllMeals(dispatch)
        console.log("allMeals:")
        console.log(allMeals)
    },[])

    const divStyle = {
        margin:'108px 0 0 0'
    }

    return (
        <div style={divStyle}>
            {allMeals && allMeals.map((meal,i) =>{
                return(
                <EditTable key={meal._id} i={i} id={meal._id} title={meal.title} description={meal.description} price={meal.price} url={meal.url} />
            )
        })}
        </div>
    )
}

export default EditMealContainer
