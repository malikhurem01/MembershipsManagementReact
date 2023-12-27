import { PDFViewer } from '@react-pdf/renderer';
import SpreadsheetReportTemplate from '../Templates/SpreadsheetReport/SpreadsheetReportTemplate';
import DebtWarningTemplate from '../Templates/DebtWarning/DebtWarningTemplate';

const PDFPage = () => {
  return (
    <PDFViewer showToolbar={false} height={777} width={555}>
      <DebtWarningTemplate />
    </PDFViewer>
  );
};

export default PDFPage;
