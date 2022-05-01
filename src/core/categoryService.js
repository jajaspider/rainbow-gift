const _ = require('lodash');

const DB = require('../models');
const Category = DB['Category'];

async function getMainCategory() {
    let main = [];
    let categories = await Category.find();
    for (let category of categories) {
        if (!main.includes(_.get(category, 'mainCategory'))) {
            main.push(_.get(category, 'mainCategory'));
        }
    }

    return main;
}

async function getSubCategory(name) {
    let sub = [];
    let categories = await Category.find({
        mainCategory: name
    });
    for (let category of categories) {
        if (!sub.includes(_.get(category, 'subCategory'))) {
            sub.push(_.get(category, 'subCategory'));
        }
    }

    return sub;
}

async function genCategory(payload) {
    let result = await Category.create(payload);
    return result;
}

module.exports = {
    getMainCategory,
    getSubCategory,
    genCategory
}