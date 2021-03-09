const router = require('express').Router();
const { request } = require('express');
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Product');
//const { restore } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll ({
    //attributes: [ 'id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });


router.post('/', (req, res) => {
  // create a new category
  Category.create({
  category_name: req.body.category_name
})
.then(dbCategoryData => res.json(dbCategoryData))
.catch(err => {
  console.log(err);
  res.status(500).json(err)
});
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id,
    },
  })
  .then((Category))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
