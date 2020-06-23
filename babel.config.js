module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
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
