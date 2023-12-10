import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login/korisnik');
  }, [navigate]);
  return;
};

export default IndexPage;
