import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import LandingPageHeader from "../Header/LandingPageHeader.js";

function LandingPage() {
  const [pills, setPills] = React.useState("1");
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Who we are?</h2>
                <h5 className="description">
                    This is where you put your company description.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-info"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/bg38.jpg") + ")",
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "Over the span of the satellite record, Arctic sea ice has
                      been declining significantly, while sea ice in the
                      Antarctichas increased very slightly" <br></br>
                      <br></br>
                      <small>-NOAA</small>
                    </p>
                  </div>
                  <div
                    className="image-container image-left-bottom"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/bg24.jpg") + ")",
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/bg39.jpg") + ")",
                    }}
                  ></div>
                  <h3>
                    Some more company text can go here
                  </h3>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                  <p>
                    For a start, it does not automatically follow that a record
                    amount of ice will melt this summer. More important for
                    determining the size of the annual thaw is the state of the
                    weather as the midnight sun approaches and temperatures
                    rise. But over the more than 30 years of satellite records,
                    scientists have observed a clear pattern of decline,
                    decade-by-decade.
                  </p>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div
          className="testimonials-1 section-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/bg19.jpg") + ")",
          }}
        >
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <h2 className="title">What is ALPHA?</h2>
                <h4 className="description text-white">
                  If you’re selected for ALPHA you’ll also get 3 tickets,
                  opportunity to access Investor Office Hours and Mentor Hours
                  and much more all for €850.
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card className="card-testimonial">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img img-raised"
                        src={require("../../assets/img/michael.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <p className="card-description">
                      The networking at Web Summit is like no other European
                      tech conference.
                    </p>
                  </CardBody>
                  <div className="icon icon-info">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <CardFooter>
                    <CardTitle tag="h4">Michael Elijah</CardTitle>
                    <p className="category">@michaelelijah</p>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-testimonial">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img img-raised"
                        src={require("../../assets/img/olivia.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <p className="card-description">
                      The connections you make at Web Summit are unparalleled,
                      we met users all over the world.
                    </p>
                  </CardBody>
                  <div className="icon icon-info">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <CardFooter>
                    <CardTitle tag="h4">Olivia Harper</CardTitle>
                    <p className="category">@oliviaharper</p>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-testimonial">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img img-raised"
                        src={require("../../assets/img/james.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <p className="card-description">
                      Web Summit will increase your appetite, your inspiration,
                      and your network.
                    </p>
                  </CardBody>
                  <div className="icon icon-info">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <CardFooter>
                    <CardTitle tag="h4">James Logan</CardTitle>
                    <p className="category">@jameslogan</p>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Want to work with us?</h2>
            <p className="description">Your project is very important to us.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    firstFocus ? "input-lg input-group-focus" : "input-lg"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    emailFocus ? "input-lg input-group-focus" : "input-lg"
                  }
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
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
