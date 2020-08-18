import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// react plugin for creating notifications
import "../../assets/scss/now-ui-dashboard.scss";
import "bootstrap/dist/css/bootstrap.css";
// core components
import routes from "../../routes.js";
import Sidebar from "../Sidebar/Sidebar.js";


var ps;

class Dashboard extends React.Component {
  state = {
    sidebarMini: true,
    backgroundColor: "blue",
  };
  notificationAlert = React.createRef();
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      // ps = new PerfectScrollbar(this.mainPanel.current);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
  minimizeSidebar = () => {
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

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          routes={routes}
          minimizeSidebar={this.minimizeSidebar}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
            <Switch>
              {this.getRoutes(routes)}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
        </div>

      </div>
    );
  }
}

export default Dashboard