const express = require('express');
const _ = require('lodash');

const categoryService = require('../../core/categoryService');

const categoryRouter = express.Router();


// 기프티콘 대분류 조회
categoryRouter.get('/', async function (req, res, next) {
    let categories = await categoryService.getMainCategory();
    return res.json({
        isSuccess: true,
        categories
    });
});

// 카테고리 소분류 조회
categoryRouter.get('/:category', async function (req, res, next) {
    let categories = await categoryService.getSubCategory(req.params.category);
    return res.json({
        isSuccess: true,
        mainCategory: req.params.category,
        subCategories: categories
    });
});

categoryRouter.post('/', async function (req, res, next) {
    // console.dir(req.user);
    let main = _.get(req.body, 'mainCategory');
    if (!main) {
        return res.json({
            isSuccess: false,
            reason: 'mainCategory is empty'
        });
    }

    let sub = _.get(req.body, 'subCategory');
    if (!sub) {
        return res.json({
            isSuccess: false,
            reason: 'subCategory is empty'
        });
    }

    let alias = _.get(req.body, 'alias');
    if (!alias) {
        return res.json({
            isSuccess: false,
            reason: 'alias is empty'
        });
    }

    try {
        await categoryService.genCategory(req.body);
        return res.json({
            isSuccess: true
        });
    } catch (e) {
        console.dir(e);
        return res.json({
            isSuccess: false,
            reason: e.message,
            originError: e
        });
    }

});

module.exports = categoryRouter;