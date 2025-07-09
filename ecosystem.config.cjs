require("dotenv").config();

module.exports = {
    apps: [{
        name: "forixo-discord",
        script: "./index.js",
        watch: true,
        ignore_watch: [
            "node_modules",
            ".git",
            "logs"
        ],
        env: {
            ...process.env,
        }
    }]
}
