module.exports = {
    presets: [
        "@babel/preset-react",
        ["@babel/preset-env", {
            targets: {
                browsers: ["defaults",
                    "last 1 version",
                    "> 1%",
                    "not IE 11",
                    "not IE_Mob 11",
                    "maintained node versions"]
            }
        }]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ],
    env: {
        production: {
            only: ["wsrc"],
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
