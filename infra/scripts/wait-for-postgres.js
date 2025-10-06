//This file have to wait the DB to be ready to acept connections.
const { exec } = require("node:child_process");

function checkPostgres() {
<<<<<<< HEAD
	exec("docker exec postgres-dev pg_isready --host localhost;", handleReturn);

	function handleReturn(error, stdout) {
		if (stdout.search("accepting connections") === -1) {
			process.stdout.write(".");
			return checkPostgres();
		}
		console.log("\n🟢 Postgres está pronto e aceitando conexões!");
	}
=======
    exec("docker exec postgres-dev pg_isready --host localhost;", handleReturn);

    function handleReturn(error, stdout) {
        if (stdout.search("accepting connections") === -1) {
            process.stdout.write(".");
            return checkPostgres();
        }
        console.log("\n🟢 Postgres está pronto e aceitando conexões!");
    }
>>>>>>> origin
}

process.stdout.write("\n\n🟡 Aguardando Postgres aceitar conexões.");
checkPostgres();
