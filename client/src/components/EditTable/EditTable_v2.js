import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthContext from '../../AuthContext'
import {updateMeal} from '../../actions'

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
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow key={values.id}>
              <TableCell component="th" scope="row">
              <input align="right" type="text" name="title" onChange={handleChange} value={values.title || ""}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <input align="right" type="text" name="description" onChange={handleChange} value={values.description || ""} />
              </TableCell>
              <TableCell component="th" scope="row">
              <input align="right" type="text" name="price" onChange={handleChange} value={values.price || ""} />
              </TableCell>
              <TableCell component="th" scope="row">
              <input align="right" type="text" name="url" onChange={handleChange} value={values.url || ""} />
              </TableCell>
              <button onClick={handleSubmit}>
                            Submit
                        </button>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default SimpleTable;