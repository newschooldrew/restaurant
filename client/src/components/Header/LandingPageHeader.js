import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import headersStyle from "../../assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import {withRouter} from 'react-router-dom'
// core components

const useStyles = makeStyles(headersStyle);

function LandingPageHeader({history}) {
  const classes = useStyles();
  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const clickToCheckout = () =>{
    history.push('/all-meals')
  }

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/bg26.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <div
          className={classes.pageHeader}
          style={{ backgroundImage: "url(" + require("../../assets/img/bg26.jpg") + ")" }}
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Your Restaurant Here</h1>
                <h4>
                  Here is a place to showcase your restaurant
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  // target="_blank"
                  // rel=""
                  onClick={clickToCheckout}
                >
                  {/* <i className="fas fa-ticket-alt" /> */}
                  Start Shopping
                </Button>
              </GridItem>
              <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
                <div className={classes.iframeContainer}>
                  <iframe
                    height="250"
                    src="https://www.youtube.com/embed/IN6QnLpVEPI?ref=creativetim"
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen=""
                    title="Tesla"
                  />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LandingPageHeader);
