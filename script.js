// Fungsi untuk menghasilkan input matriks
function generateMatrices() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);

  // Menghapus elemen matriks sebelumnya
  document.getElementById('matrix-a').innerHTML = "<h3>Matriks A</h3>";
  document.getElementById('matrix-b').innerHTML = "<h3>Matriks B</h3>";

  // Membuat input matriks A
  const matrixA = document.getElementById('matrix-a');
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('matrix-row');
    for (let j = 0; j < cols; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;
      row.appendChild(input);
    }
    matrixA.appendChild(row);
  }

  // Membuat input matriks B
  const matrixB = document.getElementById('matrix-b');
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('matrix-row');
    for (let j = 0; j < cols; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;
      row.appendChild(input);
    }
    matrixB.appendChild(row);
  }
}

// Fungsi untuk mendapatkan data matriks dari input
function getMatrixData(matrixId) {
  const matrix = document.querySelectorAll(`#${matrixId} input`);
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);

  let data = [];
  for (let i = 0; i < rows; i++) {
    data[i] = [];
    for (let j = 0; j < cols; j++) {
      data[i][j] = parseFloat(matrix[i * cols + j].value);
    }
  }
  return data;
}

// Fungsi untuk menampilkan hasil matriks
function displayResult(result) {
  const resultMatrix = document.getElementById('result-matrix');
  resultMatrix.innerHTML = '';  // Reset hasil sebelumnya

  const rows = result.length;
  const cols = result[0].length;

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('matrix-row');
    for (let j = 0; j < cols; j++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.readOnly = true;
      input.value = result[i][j];
      row.appendChild(input);
    }
    resultMatrix.appendChild(row);
  }
}

// Fungsi untuk melakukan operasi matriks
function calculate(operation) {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);

  const matrixA = getMatrixData('matrix-a');
  const matrixB = getMatrixData('matrix-b');

  // Menyimpan hasil matriks
  let result = [];

  if (operation === '+') {
    // Penjumlahan Matriks
    if (rows === matrixB.length && cols === matrixB[0].length) {
      for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
          result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
      }
      displayResult(result);
    } else {
      alert("Jumlah baris dan kolom matriks A dan B harus sama untuk penjumlahan!");
    }
  } else if (operation === '-') {
    // Pengurangan Matriks
    if (rows === matrixB.length && cols === matrixB[0].length) {
      for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
          result[i][j] = matrixA[i][j] - matrixB[i][j];
        }
      }
      displayResult(result);
    } else {
      alert("Jumlah baris dan kolom matriks A dan B harus sama untuk pengurangan!");
    }
  } else if (operation === 'x') {
    // Perkalian Matriks
    const colsA = cols;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    if (colsA !== rowsB) {
      alert("Jumlah kolom matriks A harus sama dengan jumlah baris matriks B untuk perkalian!");
      return;
    }

    // Matriks hasil perkalian
    for (let i = 0; i < rows; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        result[i][j] = 0;
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    displayResult(result);
  }
}
