import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    padding: '90px 70px',
    fontSize: '13px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.3'
  },
  heading: {
    textAlign: 'center',
    fontSize: '20px',
    fontStyle: 'bold',
    marginTop: '80px',
    marginBottom: '60px'
  },
  body: {
    textAlign: 'justify',
    lineHeight: '1.3',
    letterSpacing: '0.3'
  },
  emphasize: {
    textDecoration: 'underline',
    fontStyle: 'bold'
  },
  footer: {
    disply: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    top: '13vh',
    height: '7vh'
  },
  signatureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default styles;
