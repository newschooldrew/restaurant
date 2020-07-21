import React,{useContext,useState} from 'react'
import {editComment} from '../../actions'
import AuthContext from '../../AuthContext'

const EditComment = ({id,content,post_id}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {editMode} = state;
    const [values,setValues] = useState({id,content,post_id})

    const handleChange = (event) => {
        const { name, value,id } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values)
      }

      const handleSubmit = () =>{
          console.log("submit hit")
          console.log("values:")
          console.log(values)
          editComment(values)
          dispatch({type:"TOGGLE_EDIT_MODE",payload:editMode})
      }
    return (
        <div>
            <input type="text" name="content" onChange={handleChange} id={values.id} value={values.content}/>
            <button onClick={handleSubmit}>Edit Comment</button>
        </div>
    )
}

export default EditComment