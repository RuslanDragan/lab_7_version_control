/** @type {import('jest').Config} */
const config = {
    verbose: true,
    reporters: process.env.TESTOMATIO
        ? ['default', ['./node_modules/@testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }]]
        : ['default']
};

module.exports = config;
