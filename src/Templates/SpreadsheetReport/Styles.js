import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto'
  },
  header: {
    height: '20vh',
    backgroundColor: '#00BF63',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: 'white',
    fontStyle: 'bold',
    textAlign: 'center',
    fontSize: '45px',
    padding: '25px 54px'
  },
  medzlisanddzemat: {
    fontSize: '16px',
    textAlign: 'left',
    marginTop: '15px',
    lineHeight: '1.5px'
  },
  reportDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '15px',
    fontSize: '14px'
  },
  main: {
    padding: '10px 54px'
  },
  sectionHeader: {
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '20px',
    fontStyle: 'medium'
  },
  sectionBody: {
    fontSize: '13px'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10
  }
});

export default styles;
