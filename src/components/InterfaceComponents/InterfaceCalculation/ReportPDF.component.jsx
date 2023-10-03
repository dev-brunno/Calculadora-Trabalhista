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
    titulo: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 'auto',
      marginBottom: 20,
      padding: 8,
      textAlign: 'center',
      width: 230,
    },
    bgTest: {
      backgroundColor: 'rgb(69 26 3)',
      padding: 20,
    },
    containerClientdados: {
      padding: 20,
      borderWidth: 1,
    },
  });

  const stylesResults = StyleSheet.create({
    item: {
      fontSize: 11,
      padding: 4,
    },
    box1: {
      flexDirection: 'row', // Define a direção como horizontal (um ao lado do outro)
    },
    box2: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row', // Define a direção como horizontal (um ao lado do outro)
      padding: 10,
      borderWidth: 1,
      borderRadius: 6,
    },
  });

  const stylesCalculationResults = StyleSheet.create({
    item: {
      fontSize: 14,
      marginBottom: 5,
      backgroundColor: '#0074B7',
      color: 'white',
      padding: 4,
    },
  });

  const ordenarCalculos = (calculos) => {
    const chavesDesejadas = [
      'Período',
      'Ano correspondente',
      'Última Remuneração',
      'Remuneração',
      'Salário Mensal',
      'Salário Base',
      'Férias',
      'Terço Constitucional',
      'Grau de Insalubridade',
    ];

    const ordenado = {};

    // Cria um objeto ordenado com base na ordem desejada das chaves (exceto 'Valor a Receber')
    chavesDesejadas.forEach((chave) => {
      if (calculos[chave]) {
        ordenado[chave] = calculos[chave];
      }
    });

    // Adiciona outras chaves que não estão na lista de chaves desejadas (exceto 'Valor a Receber')
    for (const chave in calculos) {
      if (!ordenado[chave] && !chavesDesejadas.includes(chave) && chave !== 'Valor a Receber') {
        ordenado[chave] = calculos[chave];
      }
    }

    // Adicione 'Valor a Receber' por último, se existir
    if (calculos['Valor a Receber']) {
      ordenado['Valor a Receber'] = calculos['Valor a Receber'];
    }

    return ordenado;
  };

  const renderNestedData = (data, styles) => {
    return (
      <View style={styles.box2}>
        {Object.entries(data).map(([key, value]) => (
          <View style={styles.box1} key={key}>
            {typeof value === 'object' ? (
              Array.isArray(value) ? (
                value.map((item, itemIndex) => (
                  <View key={itemIndex}>{renderNestedData(item, styles)}</View>
                ))
              ) : (
                renderNestedData(value, styles)
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
            <Text style={styles.titulo}>{title}</Text>
            {Array.isArray(results) ? (
              // Se results for um array, renderize cada conjunto de dados
              results.map((result, index) => (
                <View key={index}>{renderNestedData(result, stylesResults)}</View>
              ))
            ) : (
              // Se results for um objeto, renderize-o como um único conjunto de dados
              <View>{renderNestedData(results, stylesResults)}</View>
            )}
          </View>
          {Object.entries(calculationResults).map(([calculationKey, calculationValue]) => (
            <View key={calculationKey} style={styles.section}>
              <Text style={styles.heading}>{calculationKey}</Text>
              {Array.isArray(calculationValue) ? (
                calculationValue.map((calculationResult, index) => (
                  <View key={index}>
                    {renderNestedData(ordenarCalculos(calculationResult), stylesCalculationResults)}
                  </View>
                ))
              ) : (
                <View>
                  {renderNestedData(ordenarCalculos(calculationValue), stylesCalculationResults)}
                </View>
              )}
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
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
  calculationResults: PropTypes.object,
};

export default ReportPDF;
