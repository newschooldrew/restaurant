import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updateMeal} from '../../actions'

const EditMeal = ({id,title,description,price,url}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {username,hasUpdatedMeal} = state;
    
    const [values,setValues] = useState({title,description,price,url,id})
    const [post_id, setId] = useState('')
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        setMsg(hasUpdatedMeal)
    },[hasUpdatedMeal])

    const handleChange = (event) => {
        const { name, value,id } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        setId(id)
        console.log(values)
      }

    const handleSubmit = async e =>{
        e.preventDefault()
        const {title,description,price,url} = values;
        const meal = {title,description,url,price,id};
        await updateMeal(meal,dispatch)
    }
    return (
        <div>
                    <form>
                        {msg && (<div>{msg}</div>)}
                        <label>Title</label>
                            <input id={values._id} type="text" name="title" onChange={handleChange}  value={values.title || ""} />
                        <label>description</label>
                            <textarea id={id} name="description" onChange={handleChange} value={values.description || ""}></textarea>
                        <label>price</label>
                            <textarea id={id} name="price" onChange={handleChange} value={values.price || ""}></textarea>
                        <label>url</label>
                            <textarea id={id} name="url" onChange={handleChange} value={values.url || ""}></textarea>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
        </div>
    )
}

export default EditMeal
