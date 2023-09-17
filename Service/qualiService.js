import qualiRepository from "../Repository/qualiRepository.js";
import Excel from "exceljs";
import fs from "fs-extra";

async function importacao(filename) {
  const workbook = new Excel.Workbook();
  workbook.xlsx
    .readFile(`./uploads/${filename}`)
    .then(async () => {
      const sheet = workbook.getWorksheet(1);
      const dataArray = [];
      for (let i = 2; i <= sheet.rowCount; i++) {
        const row = sheet.getRow(i);
        const rowData = {};
        row.eachCell((cell, columnIndex) => {
          const columnName = sheet.getRow(1).getCell(columnIndex).value;
          const cellValue = cell.value;
          rowData[columnName] = cellValue;
        });
        dataArray.push(rowData);
      }
      let path = `../Qualidade/uploads/${filename}`;
      fs.remove(path)
        .then(() => {
          console.log("Arquivo removido");
        })
        .catch((e) => {
          console.log("erro ao remover");
        });
      return qualiRepository.importacao(dataArray);
    })
    .catch((error) => {
      console.error("Erro ao ler a planilha:", error);
    });
}

export default {
  importacao,
};
