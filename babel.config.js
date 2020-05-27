module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: {
                browsers: ["defaults",
                    "last 1 version",
                    "> 1%",
                    "not IE 11",
                    "not IE_Mob 11",
                    "maintained node versions"]
            }
        }],
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ],
    env: {
        production: {
            only: ["src"],
            plugins: [
                [
                    "transform-react-remove-prop-types",
                    {
                        removeImport: true
                    }
                ],
                "@babel/plugin-transform-react-inline-elements",
                "@babel/plugin-transform-react-constant-elements"
            ]
        }
    }
}
