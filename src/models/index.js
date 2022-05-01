const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');

let configPath = path.join(process.cwd(), 'config', 'develop.yaml');
let config = yaml.load(fs.readFileSync(configPath));

let mongoConfig = _.get(config, 'mongo');

mongoose
    .connect(`mongodb://${mongoConfig['ip']}:${mongoConfig['port']}/${mongoConfig['database']}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => {
        console.error(e);
        throw new Error('mongo DB connection fail');
    });

// const roomSchema = require('./room');
const userSchema = require('./user');
const gifticonSchema = require('./gifticon');
const categorySchema = require('./categories');
// const permissionSchema = require('./permission');
// const manageSchema = require('./manage');
// const maplestorySchema = require('./maplestory');
// const lostarkSchema = require('./lostark');

// const Selection = mongoose.model('Selection', selectionSchema);

module.exports = {
    // Room: roomSchema,
    User: userSchema,
    Gifticon: gifticonSchema,
    Category: categorySchema
    // Permission: permissionSchema,
    // Manage: manageSchema,
    // Maplestory: maplestorySchema,
    // Lostark: lostarkSchema,
}