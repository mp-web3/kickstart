const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); /*It's the file systeme module with some more helpers*/

const buildPath = path.resolve(__dirname, 'build'); /* This is the path to our future build folder */
fs.removeSync(buildPath); /* removeSync is a method from fs-extra that is capable to remove a folder and everything inside of it*/

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8'); /* This reads our Campaign.sol contract */
const output = solc.compile(source, 1).contracts; /* The output will contain 2 outputs, 1 resulting from the Campaign contract and the other from the Factory contract*/

fs.ensureDirSync(buildPath); /*ensureDir check to see if a directory already exist before creating it */

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}
