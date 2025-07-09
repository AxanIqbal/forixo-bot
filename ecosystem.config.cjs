require("dotenv").config();

module.exports = {
    apps: [{
        name: "forixo-discord",
        script: "index.ts",
        interpreter: "bun",
        watch: true,
        ignore_watch: [
            "node_modules",
            ".git",
            "logs"
        ],
        env: {
            ...process.env,
            PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
        }
    }]
}
