import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals,createMeal} from '../../actions'
import Select from "react-select";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import {
    Form,
    FormGroup,
    Input,
    Button
  } from "reactstrap";
  import axios from 'axios';

const AddMeal = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    const [singleSelect, setSingleSelect] = useState('');
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [url,setURL] = useState('')
    const [description,setDescription] = useState('')
    const [image, setImage] = useState('')

    useEffect(() =>{
        fetchAllMeals(dispatch)
    },[username])

    const divStyle = {
        margin: '8% 0 0 0'
      };

    const handleImageUpload = async () =>{
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset","q67arr6h")
        data.append("cloud_name","dzdvrgbjd")
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dzdvrgbjd/image/upload",
          data
        )
        return res.data.url
      }

      const handleSubmit = async e =>{
        e.preventDefault();
        const url = await handleImageUpload()
        console.log("singleSelect:")
        console.log(singleSelect.value)
        createMeal(title,price,description,url,singleSelect.value)
    }

    return (
        <div style={divStyle}>
                  <Form onSubmit={handleSubmit}>
        <div className="form-row">
            <FormGroup className="col-md-6">
                <label htmlFor="title">Title</label>
                <Input id="title" placeholder="Title" type="title" value={title} onChange={e=> setTitle(e.target.value)}></Input>
            </FormGroup>
            <FormGroup className="col-md-6">
                <label htmlFor="description">Description</label>
                <Input
                id="description"
                placeholder="description"
                type="description"
                value={description}
                onChange={e=> setDescription(e.target.value)}
                ></Input>
            </FormGroup>
            <FormGroup className="col-md-6">
                <label htmlFor="price">Price</label>
                <Input id="price" placeholder="Price" type="price" value={price} onChange={e=> setPrice(e.target.value)}></Input>
            </FormGroup>
            <FormGroup className="col-md-6">
            <label htmlFor="url">URL</label>
                <Input
                id="url"
                placeholder="url"
                type="url"
                value={url}
                disabled={image}
                onChange={e=> setURL(e.target.value)}
            />
            </FormGroup>
            <FormGroup className="col-md-6">
                <label htmlFor="price">Meal Type</label>
            <Select
                className="react-select"
                classNamePrefix="react-select"
                name="singleSelect"
                value={singleSelect}
                onChange={value => setSingleSelect(value)}
                options={[
                    { value: "Breakfast", label: "Breakfast" },
                    { value: "Lunch", label: "Lunch" },
                    { value: "Dinner", label: "Dinner" },
                    { value: "Drinks", label: "Drinks" },
                    { value: "Appetizers", label: "Appetizers" }
                ]}
            />
          </FormGroup>
          <FormGroup className="col-md-6">
          <label htmlFor="image">
          <input 
                accept="image/*"
                id="image"
                type="file"
                onChange={e => setImage(e.target.files[0])}
            />
                    <Button
                        style={{color:image,divStyle}}
                        component="span"
                        size="small">
                            <AddAPhotoIcon />
                    </Button>
            </label>
            </FormGroup>
            </div>
            <Button color="primary" type="submit">
            Sign in
            </Button>
      </Form>
        </div>
    )
}

export default AddMeal