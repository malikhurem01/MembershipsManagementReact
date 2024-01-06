import { useContext, useEffect, useState } from 'react';
import medzlisService from '../../../Services/medzlisService';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import AuthContext from '../../../Store/auth-context-api';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import NavBar from '../../NavBar/NavBar';

const ListDzemataPage = () => {
  const [list, setList] = useState();

  const { userDataState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataState.position !== 5) {
      return navigate('/logout');
    } else {
      const token = JSON.parse(localStorage.getItem('user_jwt'));
      medzlisService
        .getMedzlisDzematList(token, userDataState.medzlisId)
        .then(res => {
          setList(res.data.data['$values']);
        })
        .catch(err => console.log(err));
    }
  }, [userDataState, navigate]);

  return (
    <PageWrapperComponent>
      <Container>
        <NavBar
          style={{ marginBottom: '-55px' }}
          routes={[
            { route: `/pregled/medzlis/dzemati`, name: 'Popis džemata' }
          ]}
        />
        {list && (
          <ListGroup>
            <ListGroupItem>
              <h4>Popis džemata Medžlisa {userDataState.medzlis.name}</h4>
            </ListGroupItem>
            {list.map(el => {
              return (
                <ListGroupItem style={{ textAlign: 'center' }}>
                  <h5>{el.name}</h5>
                  <Link to={`/pregled/lista/dzemata/${el.id}`}>
                    <Button variant="primary">Pregled</Button>
                  </Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Container>
    </PageWrapperComponent>
  );
};

export default ListDzemataPage;
