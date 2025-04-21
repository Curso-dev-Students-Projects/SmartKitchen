const {exec} = require("node:child_process");

function checkPostgres() {
	exec("docker exec postgres-dev pg_isready --host localhost;", handleReturn);

	function handleReturn(error, stdout) {
		if (stdout.search("accepting connections") === -1) {
			process.stdout.write(".");
			return checkPostgres();
		}
		console.log("\n🟢 Postgres está pronto e aceitando conexões!");
	}
}

process.stdout.write("\n\n🟡 Aguardando Postgres aceitar conexões.");
checkPostgres();
