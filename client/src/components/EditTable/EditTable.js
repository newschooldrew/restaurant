/*eslint-disable*/
import React, { useState } from "react";

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
import EditReactTable from "../EditReactTable/EditReactTable.js";

const EditTable = ({dataTable}) => {
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
                  <EditReactTable
                    data={dataTable}
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


export default EditTable;