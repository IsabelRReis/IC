const bmp = require('bmp-js');
const fs = require('fs');
const { Image } = require('./image.js');
const { KNN } = require('./knn.js');

function readBMPImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const bmpData = bmp.decode(buffer);
  const image = new Image(bmpData);
  const matrix = image.transformMatrix();
  return matrix;
}

function classifyPixels(trainingData, unknownMatrix) {
  const knn = new KNN(1);
  const resultMatrix = [];

  for (let y = 0; y < unknownMatrix.length; y++) {
    const row = [];
    for (let x = 0; x < unknownMatrix[y].length; x++) {
      const unknownPixel = unknownMatrix[y][x];
      let minDistance = Infinity;
      let closestClass = '';

      for (let i = 0; i < trainingData.length; i++) {
        const trainingPixels = trainingData[i].pixels;
        const trainingClass = trainingData[i].class;

        for (let j = 0; j < trainingPixels.length; j++) {
          const trainingPixel = trainingPixels[j];
          const distance = knn.distance(unknownPixel, trainingPixel);


          // Verifica se a distância é menor e atualiza a classe mais próxima
          if (distance < minDistance) {
            minDistance = distance;
            closestClass = trainingClass;
          }
        }
      }

      // Armazena o valor numérico correspondente na matriz de resultado
      if (closestClass === 'flor') {
        row.push(1);
      } else if (closestClass === 'fundo') {
        row.push(0);
      }
    }
    resultMatrix.push(row);
  }

  return resultMatrix;
}

const matriz_flor = readBMPImage('./Imagens/flores.bmp');
const matriz_fundo = readBMPImage('./Imagens/fundo.bmp');
const unknownData = readBMPImage('./Imagens/unknown.bmp');

const trainingData = [
  { class: 'flor', pixels: matriz_flor },
  { class: 'fundo', pixels: matriz_fundo }
];

const resultado = classifyPixels(trainingData, unknownData);
console.log(resultado);
