function status(request, response) {
  response.status(200).json({ chave: "Eu sou acima da média!" });
}

export default status;
