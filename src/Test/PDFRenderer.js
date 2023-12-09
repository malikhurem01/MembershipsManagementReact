import { PDFViewer } from '@react-pdf/renderer';
import SpreadsheetReportTemplate from '../Templates/SpreadsheetReport/SpreadsheetReportTemplate';

const PDFRenderer = ({ children }) => {
  return (
    <PDFViewer showToolbar={false} height={777} width={555}>
      <SpreadsheetReportTemplate />
    </PDFViewer>
  );
};

export default PDFRenderer;
