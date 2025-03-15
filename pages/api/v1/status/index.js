/* A função desse endpoint é devolver informações da saúde do sistema. */
import database from "infra/database.js";

async function status(request, response) {
  //Instanciar data para mostrar o momento da requisição.
  const updatedAt = new Date().toISOString();

  //Consultar versão do banco de dados.
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult[0].server_version;

  //Consultar máximo de conexões.
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult[0].max_connections;

  //Consultar número de conexões abertas.
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnectionsValue = openedConnectionsResult[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: openedConnectionsValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
