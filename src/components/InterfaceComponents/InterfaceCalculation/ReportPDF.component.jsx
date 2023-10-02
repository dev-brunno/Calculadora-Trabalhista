import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

function ReportPDF({ title, results, calculationResults = {} }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: '1cm',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    item: {
      fontSize: 14,
      marginBottom: 5,
    },
  });

  const renderNestedData = (data) => {
    return (
      <View>
        {Object.entries(data).map(([key, value]) => (
          <View key={key}>
            {typeof value === 'object' ? (
              Array.isArray(value) ? (
                value.map((item, itemIndex) => (
                  <View key={itemIndex}>{renderNestedData(item)}</View>
                ))
              ) : (
                renderNestedData(value)
              )
            ) : (
              <Text style={styles.item}>
                {key}: {value}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const generatePdf = () => {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>{title}</Text>
            {Array.isArray(results) ? (
              // Se results for um array, renderize cada conjunto de dados
              results.map((result, index) => <View key={index}>{renderNestedData(result)}</View>)
            ) : (
              // Se results for um objeto, renderize-o como um único conjunto de dados
              <View>{renderNestedData(results)}</View>
            )}
          </View>
          {Object.entries(calculationResults).map(([calculationKey, calculationValue]) => (
            <View key={calculationKey} style={styles.section}>
              <Text style={styles.heading}>{calculationKey}</Text>
              {Array.isArray(calculationValue)
                ? calculationValue.map((calculationResult, index) => (
                    <View key={index}>{renderNestedData(calculationResult)}</View>
                  ))
                : renderNestedData(calculationValue)}
            </View>
          ))}
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <PDFViewer width='100%;' height='100%;' margin='0'>
        {generatePdf()}
      </PDFViewer>
    </div>
  );
}

ReportPDF.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object, // Agora aceita objetos também
  ]).isRequired,
  calculationResults: PropTypes.object, // Parâmetro opcional
};

export default ReportPDF;
