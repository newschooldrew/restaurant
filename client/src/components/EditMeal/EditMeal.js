import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updateMeal} from '../../actions'
import { useToasts } from 'react-toast-notifications'
import {
    Form,
    FormGroup,
    Input,
    Button
  } from "reactstrap";

const EditMeal = ({id,title,description,price,url}) => {

    const {state,dispatch} = useContext(AuthContext);
    const { addToast } = useToasts()
    const [values,setValues] = useState({title,description,price,url,id})
    const [post_id, setId] = useState('')
    const [msg,setMsg] = useState('')

    const handleChange = (event) => {
        const { name, value,id } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        setId(id)
        console.log(values)
      }

    const handleSubmit = async () =>{
        e.preventDefault()
        addToast('Your changes have been saved', { appearance: 'success' }, () => console.log("toast shown"))
        const {title,description,price,url} = values;
        const meal = {title,description,url,price,id};
        setMsg("Your changes has been submitted")
        await updateMeal(meal,dispatch)
    }

const divStyle = {
    margin:'100px 0 0 0',
    overflow:'scroll'
}

    return (
      <div style={divStyle}>
                    <Form>
                        <Row>
                        {msg && (<div>{msg}</div>)}
                        <label>Title</label>
                            <Input id={values._id} type="text" name="title" onChange={handleChange}  value={values.title || ""} />
                        <label>description</label>
                            <Input id={id} name="description" onChange={handleChange} value={values.description || ""}></textarea>
                        <label>price</label>
                            <Input id={id} name="price" onChange={handleChange} value={values.price || ""}></textarea>
                        <label>url</label>
                            <Input id={id} name="url" onChange={handleChange} value={values.url || ""}></textarea>
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Row>
                    </Form>
              </div>
    )
}

export default EditMeal
