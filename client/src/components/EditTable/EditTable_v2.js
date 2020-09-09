import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthContext from '../../AuthContext'
import {updateMeal} from '../../actions'
import { Button, Table, UncontrolledTooltip } from "reactstrap";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SimpleTable = ({id,title,description,price,url}) => {
  const classes = useStyles();
  const {state,dispatch} = useContext(AuthContext);
  const [values,setValues] = useState({id,title,description,price,url})
  console.log("values:")
  console.log(values)

  const handleChange = (event) => {
    const { name, value,id } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values)
  }

const handleSubmit = async e =>{
    e.preventDefault()
    const {title,description,price,url,id} = values;
    const meal = {title,description,url,price,id};
    await updateMeal(meal,dispatch)
}
  
  return (<>
    <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
            <tr key={values.id}>

              <td><input type="text" name="title" onChange={handleChange} value={values.title || ""}/></td>
              
              <td><input type="text" name="description" onChange={handleChange} value={values.description || ""} /></td>
              
              <td><input type="text" name="price" onChange={handleChange} value={values.price || ""} /></td>
              
              <td><input type="text" name="url" onChange={handleChange} value={values.url || ""} /></td>
              
              <button onClick={handleSubmit}>
                            Submit
                        </button>
            </tr>
        </tbody>
    </Table>
  </>);
}
export default SimpleTable;