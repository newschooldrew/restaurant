import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updatePost} from '../../actions'

const EditPostModal = ({_id,title,content,i}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {username,posts} = state;
    console.log("posts:")
    console.log(i)

    const [my_content,setContent] = useState({content})
    const [values,setValues] = useState({title,content})
    const [post_id, setId] = useState('')
    // console.log(my_title)

    // const handleTitleChange = e => {
    //     const { target: {value,name} } = e;
    //     setTitle({ [name]: value });

    //     console.log("title:")
    //     console.log(title)
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values)
      }

    // const handleContentChange = e => {

    //     const { target: {value,name} } = e;
    //     setContent({ [name]: value });

    //     console.log(content)
    // }

    const handleSubmit = async e =>{
        e.preventDefault()
        const post = {title,content,username,post_id};
        await updatePost(post)
        // setTitle('')
        setContent('')
    }
    return (
        <div>
                    <form>
                        <label>Title</label>
                            <input type="text" name="title" onChange={handleChange}  value={values.title || ""} />
                        <label>Content</label>
                            <textarea id={_id} name="content" onChange={handleChange} value={values.content || ""}></textarea>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
        </div>
    )
}

export default EditPostModal
