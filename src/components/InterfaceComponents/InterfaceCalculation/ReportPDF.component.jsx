import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import FormataRealBrasileiro from '../../../Classes/Calculos/FormataRealBrasileiro';

function ReportPDF({ title, results, calculationResults = {} }) {
  console.log(calculationResults);
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: '1cm',
      fontFamily: 'Open Sans',
      fontSize: 13,
      fontWeight: 400,
    },
    section: {
      margin: 10,
    },
    titulo: {
      fontSize: 16,
      fontWeight: 'extrabold',
      margin: 'auto',
      marginBottom: 20,
      padding: 8,
    },
    bgTest: {
      backgroundColor: 'rgb(69 26 3)',
      padding: 20,
    },
    containerResultsdados: {
      padding: 20,
      borderWidth: 1,
      borderRadius: 6,
    },
    subtitle: {
      marginBottom: 5,
      fontWeight: 'bold',
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
    textBox: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row', //
    },
    key: {
      fontWeight: 'light',
      marginRight: 4,
    },
    value: {
      fontWeight: 'bold',
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
    textBox: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row', //
      justifyContent: 'space-between',
      fontSize: 12,
    },
    containerCalcIntens: {
      padding: 5,
    },
    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    valueBold: {
      fontWeight: 'extrabold',
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

  const renderNestedDataResults = (data, styles) => {
    return (
      <View style={styles.box2}>
        {Object.entries(data).map(([key, value]) => (
          <View style={styles.item} key={key}>
            <View style={styles.textBox}>
              <Text style={styles.key}>{key}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderNestedDataCalculationResults = (data, styles) => {
    return (
      <View style={styles.containerCalcIntens}>
        {Object.entries(data).map(([key, value]) => (
          <View key={key}>
            <View style={styles.textBox}>
              <Text style={styles.key}>
                {' '}
                {/* Verifique se a chave é 'Valor a Receber' e aplique o estilo de negrito */}
                {key === 'Valor a Receber' ? <Text style={styles.valueBold}>{key}</Text> : key}:
              </Text>
              {/* Verifique se a chave é 'Valor a Receber' e aplique o estilo de negrito */}
              <Text style={key === 'Valor a Receber' ? styles.valueBold : styles.value}>
                {typeof value === 'number' ? FormataRealBrasileiro(value) : value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const generatePdf = () => {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
          <View>
            <Text style={styles.titulo}>{title}</Text>
          </View>
          {results ? (
            Array.isArray(results) ? (
              // Se results for um array, renderize cada conjunto de dados
              results.map((result, index) => (
                <View style={styles.section} key={index}>
                  <View style={styles.subtitle}>
                    <Text>Informações do Cliente:</Text>
                  </View>
                  {renderNestedDataResults(result, stylesResults)}
                </View>
              ))
            ) : (
              // Se results for um objeto, renderize-o como um único conjunto de dados
              <View style={styles.section}>
                <View style={styles.subtitle}>
                  <Text>Informações do Cliente:</Text>
                </View>
                {renderNestedDataResults(results, stylesResults)}
              </View>
            )
          ) : null}
          {Object.entries(calculationResults).map(([calculationKey, calculationValue]) => (
            <View key={calculationKey} style={styles.section}>
              <Text style={styles.subtitle}>{calculationKey}</Text>
              <View style={styles.containerResultsdados}>
                {Array.isArray(calculationValue) ? (
                  calculationValue.map((calculationResult, index) => (
                    <View key={index}>
                      {renderNestedDataCalculationResults(
                        ordenarCalculos(calculationResult),
                        stylesCalculationResults,
                      )}
                    </View>
                  ))
                ) : (
                  <View>
                    {renderNestedDataCalculationResults(
                      ordenarCalculos(calculationValue),
                      stylesCalculationResults,
                    )}
                  </View>
                )}
              </View>
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
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  calculationResults: PropTypes.object,
};

export default ReportPDF;
