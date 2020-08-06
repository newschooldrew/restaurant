import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {inputMeals} from '../../actions'
import {Link,withRouter} from 'react-router-dom'
import CSVReader from 'react-csv-reader'

const InputMeals = ({history}) => {
    const [csvFile,setFile] = useState('')
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;

    const handleFiles = (data) =>{
        console.log(data)
        inputMeals(data,dispatch)
    }

    return (
        <>
            <div>Input Meal page</div>
            <CSVReader onFileLoaded={(data, fileInfo) => handleFiles(data)} />
        </>
    )
}

export default withRouter(InputMeals)
