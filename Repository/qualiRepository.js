//import oracledb from "oracledb"

async function importacao(data) {
  try {
    console.log("Inserindo no banco!");
    console.log(data);
  } catch (error) {
    console.error("Erro ao tentar fazer algo");
  }
}

export default {
  importacao,
};
