import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {inputMeals} from '../../actions'
import {Link,withRouter} from 'react-router-dom'
import CSVReader from 'react-csv-reader'
import Sidebar from "../Sidebar/Sidebar.js";
import routes from "../../routes.js";

const InputMeals = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;
    const [sidebarMini,setSidebarMini] = useState(true)
    const [backgroundColor,setBackgroundColor] = useState('blue')

    const divStyle = {
        margin: '8% 0 0 0'
      };

    useEffect(()=>{
        console.log("input meals hit")
    },[])

    const handleFiles = (data) =>{
        console.log(data)
        inputMeals(data,dispatch)
    }

    const  minimizeSidebar = () => {
        var message = "Sidebar mini ";
        if (document.body.classList.contains("sidebar-mini")) {
          this.setState({ sidebarMini: false });
          message += "deactivated...";
        } else {
          this.setState({ sidebarMini: true });
          message += "activated...";
        }
        document.body.classList.toggle("sidebar-mini");
        var options = {};
        options = {
          place: "tr",
          message: message,
          type: "info",
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
        this.notificationAlert.current.notificationAlert(options);
      };

    return (
        <>
        <div style={divStyle}>
            <Sidebar
                routes={routes}
                minimizeSidebar={minimizeSidebar}
                backgroundColor={backgroundColor}/>
            <CSVReader onFileLoaded={(data, fileInfo) => handleFiles(data)} />
        </div>
        </>
    )
}

export default withRouter(InputMeals)
