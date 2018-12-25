module.exports = {
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
    "no-unused-vars": "warn",
    // enable additional rules
    "indent": ["warn", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["warn", "single"],
    "semi": "off",

    // override default options for rules from base configurations
    "comma-dangle": "off",
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-undef": "warn",
    "space-before-function-paren": "off",
    "one-var": "off",
    "padded-blocks": "off",
    "no-trailing-spaces": "off",
    "no-multiple-empty-lines": "off",
    "camelcase": "off"
    }   
};