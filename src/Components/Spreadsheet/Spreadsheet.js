import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel
} from 'react-bootstrap';
import classes from '../Pages/ActiveSpreadsheet/ActiveSpreadsheetPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import SpreadsheetContext from '../../Store/spreadsheet-context';
import { Line } from '@react-pdf/renderer';
import AuthContext from '../../Store/auth-context-api';
import NavBar from '../NavBar/NavBar';

const Spreadsheet = ({
  isViewMode,
  tableColumns,
  handleShowAddPayment,
  handleSetViewMember,
  spreadsheet,
  handleSetArchiveSpreadsheet,
  handleAddMemberClick
}) => {
  const {
    handleSetSearchFirstName,
    handleSetSearchLastName,
    handleSetSearchFathersName,
    handleRemoveFilters,
    handleSetPageNumber,
    handleSetPageSize,
    pageInfo,
    pageSize,
    membersInfo,
    searchFirstName,
    searchLastName,
    searchFathersName
  } = useContext(SpreadsheetContext);

  const { userDataState } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <Container fluid="md">
        <NavBar
          routes={[
            { route: '/clanarine', name: 'Redovne članarine' },
            {
              route: `/clanarine/${
                isViewMode ? 'arhiva-baza' : 'aktivna-baza'
              }`,
              name: `${isViewMode ? 'Arhiva baza' : 'Aktivna baza'}`
            }
          ]}
        />
        <Row
          style={{
            marginTop: '2vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
          }}
        >
          <Col className={classes.optionButtons} lg="auto" md="auto" xs={8}>
            <Button className="btn btn-block" size="md" variant="dark" disabled>
              {`Baza za ${spreadsheet.year}. godinu`}
            </Button>
          </Col>
          {!isViewMode && (
            <Col className={classes.optionButtons} lg="auto" md="auto" xs={8}>
              <Button
                size="md"
                variant="primary"
                onClick={handleAddMemberClick}
              >
                Dodaj novog člana
              </Button>
            </Col>
          )}
          <Col className={classes.optionButtons} lg="auto" md="auto" xs={8}>
            <Button
              onClick={() => {
                navigate(
                  '/clanarine/izradi-izvjestaj?godina=' + spreadsheet.year
                );
              }}
              size="md"
              variant="primary"
            >
              Izradi izvještaj
            </Button>
          </Col>
          {!isViewMode && (
            <Col className={classes.optionButtons} lg="auto" md="auto" xs={8}>
              <Button
                onClick={handleSetArchiveSpreadsheet}
                size="md"
                variant="danger"
                disabled={userDataState.position !== 1}
              >
                Arhiviraj bazu
              </Button>
            </Col>
          )}
          <Col lg="auto" md="auto" xs={10}>
            <FloatingLabel
              controlId="floatingPageSize"
              label="Broj članova po stranici"
            >
              <Form.Select
                style={{ width: '200px' }}
                value={pageSize}
                onChange={ev => {
                  handleSetPageSize(ev.target.value);
                }}
                aria-label="PageSize"
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Table style={{ marginTop: '2vh' }} hover striped responsive>
          <thead>
            <tr>
              {tableColumns.map((val, index) => (
                <th style={{ minWidth: `${index === 9 ? '120px' : '90px'}` }}>
                  {val}
                </th>
              ))}
            </tr>
            <tr>
              <th>
                <Form.Control
                  size="sm"
                  name="firstName"
                  type="text"
                  placeholder="Filter"
                  disabled
                />
              </th>
              <th>
                <Form.Control
                  size="sm"
                  name="firstName"
                  type="text"
                  placeholder="Ime člana"
                  value={searchFirstName}
                  onChange={handleSetSearchFirstName}
                />
              </th>
              <th>
                <Form.Control
                  size="sm"
                  name="lastName"
                  type="text"
                  placeholder="Prezime"
                  value={searchLastName}
                  onChange={handleSetSearchLastName}
                />
              </th>
              <th>
                <Form.Control
                  size="sm"
                  name="lastName"
                  type="text"
                  placeholder="Ime oca"
                  value={searchFathersName}
                  onChange={handleSetSearchFathersName}
                />
              </th>
              <th>
                <Form.Control
                  size="sm"
                  name="firstName"
                  type="text"
                  placeholder="Filter"
                  disabled
                />
              </th>

              <th></th>
              <th>
                <Form.Control
                  size="sm"
                  name="firstName"
                  type="text"
                  placeholder="Filter"
                  disabled
                />
              </th>
              <th>
                <Form.Control
                  size="sm"
                  name="firstName"
                  type="text"
                  placeholder="Filter"
                  disabled
                />
              </th>
              {!isViewMode && <th></th>}
              <th>
                <Button
                  onClick={handleRemoveFilters}
                  variant="danger"
                  size="sm"
                >
                  <strong>Bez filtera</strong>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {membersInfo.map((m, index) => {
              return (
                <tr>
                  <td>
                    <strong> {m.member.evNumber}</strong>
                  </td>
                  <td>
                    <strong> {m.member.firstName}</strong>
                  </td>
                  <td>
                    <strong> {m.member.lastName}</strong>
                  </td>
                  <td>
                    <strong> {m.member.fathersName}</strong>
                  </td>
                  <td>
                    <Button
                      style={{ minWidth: '130px' }}
                      variant="light"
                      disabled
                      size="sm"
                    >
                      <strong>
                        {m.member.status === 0
                          ? 'Brak'
                          : m.member.status === 1
                          ? 'Udovac'
                          : m.member.status === 2
                          ? 'Granična dob'
                          : ''}
                      </strong>
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ minWidth: '80px' }}
                      variant="primary"
                      disabled
                      size="sm"
                    >
                      <strong>{m.membershipFee}KM</strong>
                    </Button>
                  </td>
                  <td>
                    {m.member.debt === 0 ? (
                      <Button
                        style={{ minWidth: '140px' }}
                        variant="success"
                        disabled
                        size="sm"
                      >
                        <strong>{m.totalAmountPayed}KM | Da</strong>
                      </Button>
                    ) : (
                      <Button
                        style={{ minWidth: '140px' }}
                        onClick={() => {
                          handleShowAddPayment(m);
                        }}
                        size="sm"
                        variant={`${isViewMode ? 'danger' : 'warning'}`}
                        disabled={isViewMode}
                      >
                        <strong>
                          {m.totalAmountPayed}
                          {`KM${!isViewMode ? ' | Uplati ' : ''}`}
                        </strong>
                      </Button>
                    )}
                  </td>
                  {!isViewMode && (
                    <td>
                      <Button
                        style={{ minWidth: '80px' }}
                        size="sm"
                        variant={m.member.debt === 0 ? 'success' : 'danger'}
                        disabled
                      >
                        {m.member.debt}KM
                      </Button>
                    </td>
                  )}
                  <td>
                    <Button
                      style={{ minWidth: '120px' }}
                      variant="primary"
                      disabled
                      size="sm"
                    >
                      <strong>
                        {m.payments['$values'].length > 0
                          ? m.payments['$values'][0].dateOfPayment.split('T')[0]
                          : 'Nema uplata'}
                      </strong>
                    </Button>
                  </td>
                  {!isViewMode && (
                    <td>
                      <Button
                        onClick={() => handleSetViewMember(m)}
                        size="sm"
                        variant="primary"
                      >
                        Informacije
                      </Button>
                    </td>
                  )}
                  {isViewMode && <td></td>}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div className={classes.paginationButtons}>
            {pageInfo.hasPreviousPage && (
              <Button
                size="sm"
                variant="primary"
                style={{ marginRight: '10px' }}
                onClick={() => {
                  handleSetPageNumber(prevState => prevState - 1);
                }}
              >
                Prethodna
              </Button>
            )}
            {pageInfo.hasNextPage && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  handleSetPageNumber(prevState => prevState + 1);
                }}
              >
                Sljedeća
              </Button>
            )}
          </div>
          {pageInfo.totalCount > 0 && (
            <Button
              style={{ marginTop: '10px' }}
              size="sm"
              variant="secondary"
              disabled
            >
              {`Ukupan broj članova: ${pageInfo.totalCount}`}
            </Button>
          )}
          {pageInfo.totalCount === 0 && (
            <Button
              style={{ marginTop: '10px' }}
              size="sm"
              variant="secondary"
              disabled
            >
              Nema članova za pregled
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Spreadsheet;
