const dotenv = require("dotenv");
dotenv.config({
<<<<<<< HEAD
	path: ".env.development",
=======
    path: ".env.development",
>>>>>>> origin
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
<<<<<<< HEAD
	dir: ".",
});
const jestConfig = createJestConfig({
	moduleDirectories: ["node_modules", "<rootDir>"],
	testTimeout: 60000,
=======
    dir: ".",
});
const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
    testTimeout: 60000,
>>>>>>> origin
});

module.exports = jestConfig;
