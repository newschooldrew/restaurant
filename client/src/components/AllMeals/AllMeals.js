import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals,actionItemToCart,countAllItems} from '../../actions'
import {Link,withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {filterMeals} from '../../actions'
import update from 'react-addons-update';

import Slider from "nouislider";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Collapse,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const AllMeals = ({history}) => {
    let itemsArr = [];
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals,cartItems,cart} = state;
    useEffect(() =>{
        fetchAllMeals(dispatch)
    },[])

    const [emailFocus, setEmailFocus] = React.useState(false);
    // collapse states and functions
    const [collapses, setCollapses] = React.useState([1]);
    const changeCollapse = (collapse) => {
      if (collapses.includes(collapse)) {
        setCollapses(collapses.filter((prop) => prop !== collapse));
      } else {
        setCollapses([...collapses, collapse]);
      }
    };
    // slider states and functions
    const [sliderMin, setSliderMin] = React.useState(0);
    const [sliderMax, setSliderMax] = React.useState(880);
    const [values, setValues] = useState({breakfast:false,lunch:false});
    React.useEffect(() => {
      if (
        !document.getElementById("sliderRefine").classList.contains("noUi-target")
      ) {
        Slider.create(document.getElementById("sliderRefine"), {
          start: [sliderMin, sliderMax],
          connect: [false, true, false],
          step: 1,
          range: { min: 0, max: 40 },
        }).on("update", function (values) {
          setSliderMin(Math.round(values[0]));
          setSliderMax(Math.round(values[1]));
        });
      }

    }, []);

    const useStyles = makeStyles(theme => ({
        paper: {
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          padding:'15px',
          margin:'15px',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        paper: {
          padding: theme.spacing(.25),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        clickable:{
          cursor:'pointer',
          width:'200px',
          height:'160px',
          objectFit:'cover',
          borderRadius:'4x'
        },
        scroll:{
          overflow:'scroll'
        }
      }));
    
    const classes = useStyles();

    const handleChange = e =>{
      console.log("e:")
      console.log(e.target.value)
      console.log(e.target)

      
      console.log(values)

      const myValue = e.target.value;
      filterMeals(myValue,dispatch)
    }

    const addItemToCart = (id,title,price,url) =>{
        console.log(state)
        const item = {id,title,price,url};
        dispatch({type:"ADD_ITEM_TO_CART",payload:item})
    }
    const removeItemFromCart = (id,title,price,url) =>{
        console.log(state)
        const item = {id,title,price};
        dispatch({type:"REMOVE_ITEM_FROM_CART",payload:item})
        let myCachedTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
        console.log("myCachedTotal:")
        console.log(myCachedTotal)
        if(myCachedTotal == 1){
            console.log("Clear cart")
            sessionStorage.removeItem('cart');
            sessionStorage.setItem('cartTotal',0)
        }
    }

    return (
        <>
      <div className={"wrapper",classes.scroll}>
        <div className="main">
          <div className="section">
            <Container>
            <Button color="info" type="button"><Link to="/checkout">Go To Checkout</Link></Button>
              <h2 className="section-title">Find what you need</h2>
              <Row>
                <Col md="3">
                  <div className="collapse-panel">
                    <CardBody>
                      <Card className="card-refine card-plain">
                      <CardTitle tag="h4">
                          Refine{" "}
                          <Button
                            className="btn-icon btn-neutral pull-right"
                            color="default"
                            id="tooltip633919451"
                          >
                            <i className="arrows-1_refresh-69 now-ui-icons"></i>
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip633919451"
                          >
                            Reset Filter
                          </UncontrolledTooltip>
                        </CardTitle>
                        <CardHeader id="headingTwo" role="tab">
                          <h6>
                            <a
                              className="text-info"
                              aria-expanded={collapses.includes(1)}
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                changeCollapse(1);
                              }}
                            >
                              Clothing{" "}
                              <i className="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                          </h6>
                        </CardHeader>
                        <Collapse isOpen={collapses.includes(1)}>
                          <CardBody>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={values["breakfast"]} value="Breakfast" onChange={e => handleChange(e)}></Input>
                                <span className="form-check-sign"></span>
                                Breakfast
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={values["lunch"]} value="Lunch" onChange={e => handleChange(e)}></Input>
                                <span className="form-check-sign"></span>
                                Lunch
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={values["appetizers"]} value="Appetizers" onChange={e => handleChange(e)}></Input>
                                <span className="form-check-sign"></span>
                                Appetizers
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={values["drinks"]} value="Drinks" onChange={e => handleChange(e)}></Input>
                                <span className="form-check-sign"></span>
                                Drinks
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={values["dinner"]} value="Dinner" onChange={e => handleChange(e)}></Input>
                                <span className="form-check-sign"></span>
                                Dinner
                              </Label>
                            </FormGroup>
                          </CardBody>
                        </Collapse>
                      </Card>
                      <Card className="card-refine card-plain">
                        <CardHeader id="headingOne" role="tab">
                          <h6 className="mb-0">
                            <a
                              className="text-info"
                              aria-expanded={collapses.includes(2)}
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                changeCollapse(2);
                              }}
                            >
                              Price Range{" "}
                              <i className="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                          </h6>
                        </CardHeader>
                        <Collapse isOpen={collapses.includes(2)}>
                          <CardBody>
                            <span
                              className="price-left pull-left"
                              id="price-left"
                            >
                              ${sliderMin}
                            </span>
                            <span
                              className="price-right pull-right"
                              id="price-right"
                            >
                              ${sliderMax}
                            </span>
                            <div className="clearfix"></div>
                            <div
                              className="slider slider-refine"
                              id="sliderRefine"
                            ></div>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </CardBody>
                  </div>
                </Col>

            <Col md="9">
                <Row>
            {allMeals && allMeals.map(post =>{
              console.log("all meals post")
              console.log(post)
                const id = post._id;
                const title = post.title;
                const price = post.price;
                const url = post.url;
                let myCachedSession = JSON.parse(sessionStorage.getItem('cart'))
                let qty;
                let disabled;
                if(myCachedSession && myCachedSession.length > 0){
                    qty = myCachedSession.find((e,i) => e.title == post.title)
                        try{
                        disabled = qty.quantity;
                        } catch(e){
                            console.log("no quantity")
                        }
                }
                return(
                <>
                    <Col lg="4" md="6">
                      <Card className="card-product card-plain">
                      <div className="card-image">
                          <a onClick={(e) => history.push(`/product-page/${post._id}`)}>
                            <img
                              className={classes.clickable}
                              alt="..."
                              src={post.url}
                            />
                          </a>
                        </div>
                        <CardBody>
                            <CardTitle tag="h4">{post.title}</CardTitle>
                            <CardText className="card-description">{post.description}</CardText>
                                <CardTitle className="card-description">${post.price}</CardTitle>
                                <CardTitle>
                                    <Button color="primary" size="small" variant="contained"  disabled={!disabled} onClick={() => removeItemFromCart(id,title,price,url)}>-</Button>
                                    <Button color="primary" size="small" variant="contained" onClick={() => addItemToCart(id,title,price,url)}>+</Button>
                                </CardTitle>
                        </CardBody>
                            <CardFooter>
                                <CardText className={classes.paper}>Quantity: </CardText>
                                <CardText className={classes.paper}>{qty ? (<>{qty.quantity}</>) : 0}</CardText>
                            </CardFooter>
                        </Card>
                    </Col>
        </>)})}
                </Row>
            </Col>
    </Row>
</Container>
          </div>

          <Container>
            <h2 className="section-title">News in fashion</h2>
          </Container>
          <div className="projects-4">
            <Container fluid>
              <Row>
                <Col className="px-0" md="6">
                  <Card
                    className="card-fashion card-background"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/bg35.jpg") + ")",
                    }}
                  >
                    <CardBody>
                      <CardTitle className="text-left" tag="div">
                        <h2>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            The New York Times Todd Snyder and Raf Simons Party
                            During Men’s Fashion Week
                          </a>
                        </h2>
                      </CardTitle>
                      <CardFooter className="text-left">
                        <div className="stats">
                          <span>
                            <i className="now-ui-icons users_circle-08"></i>
                            Emy Grace
                          </span>
                          <span>
                            <i className="now-ui-icons tech_watch-time"></i>
                            June 6, 2020
                          </span>
                        </div>
                        <div className="stats-link pull-right">
                          <a
                            className="footer-link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Fashion Week
                          </a>
                        </div>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="px-0" md="6">
                  <div className="card-container">
                    <Card className="card-fashion">
                      <CardTitle tag="div">
                        <h4>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Valentina Garavani Holds a Summer Lunch in Honor of
                            Sofia Coppola...
                          </a>
                        </h4>
                      </CardTitle>
                      <CardBody>
                        <CardFooter className="text-left">
                          <div className="stats">
                            <span>
                              <i className="now-ui-icons users_circle-08"></i>
                              Jerry McGregor
                            </span>
                            <span>
                              <i className="now-ui-icons tech_watch-time"></i>
                              June 10, 2020
                            </span>
                          </div>
                        </CardFooter>
                      </CardBody>
                    </Card>
                    <Card
                      className="card-fashion card-background"
                      style={{
                        backgroundImage:
                          "url(" + require("../../assets/img/bg40.jpg") + ")",
                      }}
                    ></Card>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section">
            <Container>
              <h2 className="section-title">Latest Offers</h2>
              <Row>
                <Col md="4">
                  <Card className="card-product card-plain">
                    <div className="card-image">
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("../../assets/img/saint-laurent1.jpg")}
                      ></img>
                    </div>
                    <CardBody>
                      <CardTitle tag="h4">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Saint Laurent
                        </a>
                      </CardTitle>
                      <p className="card-description">
                        The structured shoulders and sleek detailing ensure a
                        sharp silhouette. Team it with a silk pocket square and
                        leather loafers.
                      </p>
                      <CardFooter>
                        <div className="price-container">
                          <span className="price price-old mr-1">€1,430</span>
                          <span className="price price-new">€743</span>
                        </div>
                        <div className="stats stats-right">
                          <Button
                            className="btn-icon"
                            color="neutral"
                            id="tooltip777725160"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_favourite-28"></i>
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip777725160"
                          >
                            Saved to Wishlist
                          </UncontrolledTooltip>
                        </div>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-product card-plain">
                    <div className="card-image">
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("../../assets/img/saint-laurent.jpg")}
                      ></img>
                    </div>
                    <CardBody>
                      <CardTitle tag="h4">Saint Laurent</CardTitle>
                      <p className="card-description">
                        The structured shoulders and sleek detailing ensure a
                        sharp silhouette. Team it with a silk pocket square and
                        leather loafers.
                      </p>
                      <CardFooter>
                        <div className="price-container">
                          <span className="price price-old mr-1">€1,430</span>
                          <span className="price price-new">€743</span>
                        </div>
                        <div className="stats stats-right">
                          <Button
                            className="btn-icon"
                            color="neutral"
                            id="tooltip127778557"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_favourite-28"></i>
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip127778557"
                          >
                            Saved to Wishlist
                          </UncontrolledTooltip>
                        </div>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-product card-plain">
                    <div className="card-image">
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("../../assets/img/gucci.jpg")}
                      ></img>
                    </div>
                    <CardBody>
                      <CardTitle tag="h4">Gucci</CardTitle>
                      <p className="card-description">
                        The smooth woven-wool is water resistant to ensure you
                        stay pristine after a long-haul flight. Cut in a trim
                        yet comfortable regular fit.
                      </p>
                      <CardFooter>
                        <div className="price-container">
                          <span className="price price-old mr-1">€2,430</span>
                          <span className="price price-new">€890</span>
                        </div>
                        <div className="stats stats-right">
                          <Button
                            className="btn-icon btn-neutral"
                            color="default"
                            id="tooltip221340378"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_favourite-28"></i>
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip221340378"
                          >
                            Add to Wishlist
                          </UncontrolledTooltip>
                        </div>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <div
            className="subscribe-line subscribe-line-image"
            // style={{
            //   backgroundImage: "url(" + require("assets/img/bg43.jpg") + ")",
            // }}
          >
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <div className="text-center">
                    <h4 className="title">Subscribe to our Newsletter</h4>
                    <p className="description">
                      Join our newsletter and get news in your inbox every week!
                      We hate spam too, so no worries about this.
                    </p>
                  </div>
                  <Card className="card-raised card-form-horizontal">
                    <CardBody>
                      <Form action="" method="">
                        <Row>
                          <Col sm="8">
                            <InputGroup
                              className={emailFocus ? "input-group-focus" : ""}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons ui-1_email-85"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Email Here..."
                                type="text"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                              ></Input>
                            </InputGroup>
                          </Col>
                          <Col sm="4">
                            <Button block color="info" type="button">
                              Subscribe
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
        // <>
        // <Container component="main" maxWidth="xs">
        // <CssBaseline />
        //     <Link to="/checkout">Checkout</Link>
        //     <div className={classes.paper}>
        //     <div>AllMeals page</div>
        //     <br />
        // <Grid container spacing={3}>
        //     {allMeals && allMeals.map(post =>{
        //         const id = post._id;
        //         const title = post.title;
        //         const price = post.price;
        //         let myCachedSession = JSON.parse(sessionStorage.getItem('cart'))
        //         let qty;
        //         let disabled;
        //         if(myCachedSession && myCachedSession.length > 0){
        //             qty = myCachedSession.find((e,i) => e.title == post.title)
        //                 try{
        //                 disabled = qty.quantity;
        //                 } catch(e){
        //                     console.log("no quantity")
        //                 }
        //         }
        //         return(
        //         <>
        //             <Grid container item xs={3}>
        //             <Paper className={classes.paper}>
        //             <Grid container  direction="column" >
        //                 <Grid item xs>
        //                     <Typography >{post.title}</Typography>
        //                     <Typography >{post.description}</Typography>
        //                     <Typography >{post.price}</Typography>
        //                 </Grid>

        //                 <Grid container>
        //                     <Grid item xs={9}>
        //                         <Typography className={classes.paper}>Quantity: </Typography>
        //                     </Grid>
        //                     <Grid item xs={3}>
        //                         <Typography className={classes.paper}>{qty ? (<div>{qty.quantity}</div>) : 0}</Typography>
        //                     </Grid>
        //                 </Grid>

        //                 <Grid container>
        //                     <Grid item xs={3}>
        //                         <Button size="small" variant="contained" color="primary" disabled={!disabled} onClick={() => removeItemFromCart(id,title,price)}>-</Button>
        //                     </Grid>
        //                     <Grid item xs={3}>
        //                         <Button size="small" variant="contained" color="primary" onClick={() => addItemToCart(id,title,price)}>+</Button>
        //                     </Grid>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //             </Grid>
        //         </>
        //             )}
        //         )}
        //         </Grid>
        //         </div>
        //         </Container>
        // </>
        )
}

export default withRouter(AllMeals)
