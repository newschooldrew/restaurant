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

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode:false,
      data: this.props.dataTable.map((prop, key) => {
        return {
          id: prop._id,
          title: prop.title,
          description: prop.description,
          price: prop.price,
          url: prop.url,
        };
      }),
    };
  }
  render() {
    this.onChangeFct = () => console.log("onChange usually handled by redux");

    return (
      <div>
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
                    editMode={this.state.editMode}
                    selectedObject={this.state.selectedObj}
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
