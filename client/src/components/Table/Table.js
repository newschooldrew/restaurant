/*eslint-disable*/
import React, { Component } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader/PanelHeader.js";
import ReactTable from "../ReactTable/ReactTable.js";
import EditMeal from '../EditMeal/EditMeal'

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editItem:null,
      data: this.props.dataTable.map((prop, key) => {
        return {
          id: prop._id,
          title: prop.title,
          description: prop.description,
          price: prop.price,
          url: prop.url,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find((o) => o.id === prop._id);
                  console.log(obj)
                  return () => <input value={obj.title} onChange={this.onChangeFct} />
                  }
                }
                className="btn-icon btn-round"
                color="info"
                size="sm"
              >
                <i className="fa fa-heart" />
              </Button>{" "}

              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find((o) => o.id === key);
                  this.setState({editItem:obj})
                }}
                className="btn-icon btn-round"
                color="warning"
                size="sm"
              >
                <i className="fa fa-edit" />
              </Button>{" "}

              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                className="btn-icon btn-round"
                color="danger"
                size="sm"
              >
                <i className="fa fa-times" />
              </Button>{" "}
              
            </div>
          ),
        };
      }),
    };
  }
  render() {
    this.onChangeFct = () => console.log("onChange usually handled by redux");
    console.log("this.props.dataTable:")
    console.log(this.props.dataTable[0].title)
    const  divStyle = {
      scroll: 'overflow',
      color:'red'
    }
    return (
      <div >
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">View and Edit Your Meals here</h2>
              <p className="category">
                . It is a highly flexible tool, based upon the foundations of
                progressive enhancement on which you can add advanced
                interaction controls. Please check out their{" "}
                <a
                  href="https://react-table.js.org/#/story/readme"
                  target="_blank"
                >
                  full documentation.
                </a>
              </p>
            </div>
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    columns={[
                      {
                        Header: "Title",
                        accessor: "title"
                      },
                      {
                        Header: "Description",
                        accessor: "description",
                      },
                      {
                        Header: "Price",
                        accessor: "price",
                      },
                      {
                        Header: "URL",
                        accessor: "url",
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ReactTables;
