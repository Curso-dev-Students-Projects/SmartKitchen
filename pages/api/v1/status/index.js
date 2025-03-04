import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 2 + 93");
  console.log(result);
  response.status(200).json({ chave: "Eu sou acima da média!" });
}

export default status;
