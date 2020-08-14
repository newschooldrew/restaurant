import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals} from '../../actions'
import EditMeal from '../EditMeal/EditMeal'

const EditMealContainer = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    console.log("meals:")
    console.log(allMeals)

    useEffect(() =>{
        fetchAllMeals(dispatch)
        
    },[username])


    return (
        <div>
                {allMeals && allMeals.map((meal,i) =>{
                    console.log(meal[i])
                return(
                    <EditMeal key={meal._id} i={i} id={meal._id} title={meal.title} description={meal.description} price={meal.price} url={meal.url} />
                )}
            )}
        </div>
    )
}

export default EditMealContainer

