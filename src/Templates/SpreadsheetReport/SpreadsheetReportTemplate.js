import React from 'react';
import { Document, Page, Text, View, Font } from '@react-pdf/renderer';

import robotoBlack from '../../Assets/Fonts/Roboto/Roboto-Black.ttf';
import robotoLight from '../../Assets/Fonts/Roboto/Roboto-Light.ttf';
import robotoBold from '../../Assets/Fonts/Roboto/Roboto-Bold.ttf';
import robotoMedium from '../../Assets/Fonts/Roboto/Roboto-Medium.ttf';

import styles from './Styles';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: robotoLight },
    { src: robotoBlack, fontStyle: 'heavy' },
    { src: robotoBold, fontStyle: 'bold' },
    { src: robotoMedium, fontStyle: 'medium' }
  ]
});

const SpreadsheetReportTemplate = ({ reportData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>IZVJEŠTAJ ČLANARINA</Text>
          <View style={styles.medzlisanddzemat}>
            <Text>Medžlis Islamske zajednice {reportData.medzlisName}</Text>
            <Text>Džemat {reportData.dzematName}</Text>
          </View>
          <View style={styles.reportDate}>
            <Text>{new Date().toISOString().split('T')[0]}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.sectionHeader}>
            <Text>Broj članova po statusu:</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text>Brak: {reportData.marriageStatusMembersCount}</Text>
            <Text>Udovac: {reportData.widowerStatusMembersCount}</Text>
            <Text>Granična dob: {reportData.ageLimitStatusMembersCount}</Text>
            <Text>
              Ukupno:{' '}
              {reportData.marriageStatusMembersCount +
                reportData.widowerStatusMembersCount +
                reportData.ageLimitStatusMembersCount}
            </Text>
          </View>
          <View style={styles.sectionHeader}>
            <Text>Budžet džemata</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text>Budžet: {reportData.totalPaymentsAmount} KM</Text>
            <Text>Ukupno uplaćeno: {reportData.totalPaymentsAmount} KM</Text>
          </View>
          <View style={styles.sectionHeader}>
            <Text>
              Lista članova koji su uplatili svoje obaveze za tekuću godinu
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>NADLEŽNI</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ČLAN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>UPLAĆENO (ukupno)</Text>
              </View>
            </View>
            {reportData?.membersPayed['$values']?.map(el => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {[...new Set(el.supervisors['$values'])].map(el => el)}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{el.fullName}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{el.totalAmount} KM</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.sectionHeader}>
            <Text>
              Lista članova koji nisu uplatili svoje obaveze za tekuću godinu
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ČLAN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>UPLAĆENO (ukupno)</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Dug</Text>
              </View>
            </View>
            {reportData.membersNotPayed['$values'].map(el => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{el.fullName}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{el.totalAmount}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{el.debt} KM</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SpreadsheetReportTemplate;
