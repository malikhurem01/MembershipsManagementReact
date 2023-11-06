import { useState } from "react";
import PageWrapperComponent from "../../PageWrapper/PageWrapperComponent";
import classes from "./ActiveSpreadsheetPage.module.css";
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import FormAddMember from "../../FormModal/FormAddMember";
import memberService from "../../../Services/memberService";

const ActiveSpreadsheetPage = () => {
  const [searchName, setSearchName] = useState();
  const [searchLastName, setSearchLastName] = useState();
  const [showAddMember, setShowAddMember] = useState(false);

  const tableColumns = [
    "Ev. broj",
    "Ime",
    "Prezime",
    "Ime oca",
    "Status",
    "Članarina",
    "Uplaćeno",
    "Dug",
    "Datum uplate",
    "Postavke",
  ];

  const handleAddMemberClick = () => {
    setShowAddMember((prevState) => !prevState);
  };

  const handleFormSubmit = (token, data) => {
    memberService
      .addMember(token, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageWrapperComponent>
      {showAddMember && (
        <FormAddMember
          handleFormSubmit={handleFormSubmit}
          handleAddMemberClick={handleAddMemberClick}
        />
      )}
      <div className={classes.mainContainer}>
        <Container fluid="md">
          <Row>
            <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
              <Button
                size="md"
                variant="primary"
                onClick={handleAddMemberClick}
              >
                Dodaj novog člana
              </Button>
            </Col>
            <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
              <Button size="md" variant="danger">
                Arhiviraj bazu
              </Button>
            </Col>
          </Row>
          <Row className={classes.inputs}>
            <Col lg="auto" md="auto" sm="auto">
              <FloatingLabel controlId="floatingName" label="Ime">
                <Form.Control
                  value={searchName}
                  onChange={(ev) => setSearchName(ev.target.value)}
                  type="text"
                  placeholder="Ime člana"
                />
              </FloatingLabel>
            </Col>
            <Col lg="auto" md={4} sm="auto">
              <FloatingLabel controlId="floatingLastName" label="Prezime">
                <Form.Control
                  value={searchLastName}
                  onChange={(ev) => setSearchLastName(ev.target.value)}
                  type="text"
                  placeholder="Prezime"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Table hover striped responsive>
            <thead>
              <tr>
                <th>#</th>
                {tableColumns.map((el, index) => (
                  <th key={index}>{el}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {Array.from({ length: 9 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
                <td>
                  <Button size="sm" variant="primary">
                    Informacije
                  </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 9 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
                <td>
                  <Button size="sm" variant="primary">
                    Informacije
                  </Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 9 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
                <td>
                  <Button size="sm" variant="primary">
                    Informacije
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </PageWrapperComponent>
  );
};

export default ActiveSpreadsheetPage;
