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

const DebtWarningTemplate = ({ data }) => {
  const hyphenationCallback = word => {
    return [word];
  };

  const factorDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  };

  return (
    <Document>
      {data.map(el => {
        return (
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text>Džemat {el.dzematName}</Text>
              <Text>
                {el.firstName} ({el.fathersName}) {el.lastName}
              </Text>
            </View>
            <View style={styles.heading}>
              <Text>OPOMENA</Text>
            </View>
            <View style={styles.body}>
              <Text hyphenationCallback={hyphenationCallback}>
                Poštovani,{'\n\n'}
              </Text>
              <Text hyphenationCallback={hyphenationCallback}>
                Uvidom u stanje uplata dana{' '}
                <Text style={styles.emphasize}>{`${factorDate()}.`}</Text>{' '}
                godine, uvidili smo da imate neizmirene obaveze za plaćanje
                redovnih članarina u iznosu od{' '}
                <Text
                  hyphenationCallback={hyphenationCallback}
                  style={styles.emphasize}
                >
                  {el.debt} KM.{' '}
                </Text>
                Molimo Vas da ih do kraja kalendarske godine izmirite. Ukoliko
                imate nekih nedoumica slobodno nas kontaktirajte, mi Vam stojimo
                na raspolaganju.
                {'\n\n'}S poštovanjem,
              </Text>
            </View>
            <View style={styles.footer}>
              <Text>Džematski odbor dana {`${factorDate()}. godine, `}</Text>
              <View style={styles.signatureContainer}>
                <Text>Potpis:{'\n\n'}</Text>
                <Text>_______________________________</Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default DebtWarningTemplate;
