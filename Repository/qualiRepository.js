import oracledb from "oracledb";

async function importacao(data) {
  try {
    const dataToDb = [];
    for (let dados of data) {
      if (!dados.ID2) {
        throw new Error("ID2 não encontrado");
      }
      if (!dados.EXIBICAO) {
        dados.EXIBICAO = null;
        console.log("EXIBICAO incluído");
      }
      if (!dados.COMPLEMENTO) {
        dados.COMPLEMENTO = null;
        console.log("COMPLEMENTO incluído");
      }
      if (!dados.LATITUDE) {
        dados.LATITUDE = null;
        console.log("LATITUDE incluído");
      }
      if (!dados.LONGITUDE) {
        dados.LONGITUDE = null;
        console.log("LONGITUDE incluído");
      }
    }
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xepdb1",
    });
    console.log("Conectado!");
    for (let dados of data) {
      const newObj = {
        ID2: dados.ID2,
        EXIBICAO: dados.EXIBICAO,
        COMPLEMENTO: dados.COMPLEMENTO,
        LATITUDE: dados.LATITUDE,
        LONGITUDE: dados.LONGITUDE,
      };
      dataToDb.push(newObj);
    }
    console.log(dataToDb);
    for (let obj of dataToDb) {
      let resultado = await connection.execute(
        `SELECT COUNT(*) FROM ENTRADA_DADOS_PLANILHA WHERE ID2 = ${obj.ID2}`
      );
      console.log(resultado.rows[0][0]);
      if (resultado.rows[0][0] === 0) {
        await connection.execute(
          `INSERT INTO ENTRADA_DADOS_PLANILHA (ID2, EXIBICAO, COMPLEMENTO, LATITUDE, LONGITUDE) VALUES ('${obj.ID2}', '${obj.EXIBICAO}', '${obj.COMPLEMENTO}', '${obj.LATITUDE}', '${obj.LONGITUDE}')`
        );
        console.log("Insert");
        await connection.commit();
        console.log("Commit realizado.");
      } else {
        await connection.execute(
          `UPDATE ENTRADA_DADOS_PLANILHA SET EXIBICAO = '${obj.EXIBICAO}', COMPLEMENTO = '${obj.COMPLEMENTO}', LATITUDE = '${obj.LATITUDE}', LONGITUDE = '${obj.LONGITUDE}' WHERE ID2 = '${obj.ID2}'`
        );
        console.log("Update");
        await connection.commit();
        console.log("Commit realizado.");
      }
    }
    await connection.close();
    console.log("Conexão fechada!");
    console.log("Inserido no banco!");
  } catch (error) {
    console.error(error);
  }
}

export default {
  importacao,
};
