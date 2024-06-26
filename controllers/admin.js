const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result =>{
    console.log(result);
    res.redirect('/admin/products');
  }).catch(err =>{
    console.log(err);
  })
  
};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;

  console.log(editMode);

  if(!editMode){
    return res.redirect('/');
  }

  const prodId = req.params.productID;

  console.log(prodId);
    req.user.getProducts({where : {id: prodId} }).then(products =>{
      const product = products[0];
    if(!product){

      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/Edit-product',
      editing: editMode,
      product:product
    })
  }).catch(err => console.log(err))

  
};

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updateddescription = req.body.description;
    const updatedprice = req.body.price;
    Product.findByPk(prodId)
    .then(product =>{
        product.title = updatedTitle;
        product.imageUrl = updatedimageUrl;
;       product.description = updateddescription;
        product.price = updatedprice;
        return product.save();
    })
    .then(result =>{
      console.log('UPDATED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    })
    
}


exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product =>{
    return product.destroy();
  })
  .then((result)=>{
    console.log("DESTOYED PRODUCT");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  
};


exports.getProducts = (req, res, next) => {
  const prodid = req.body.productId;

  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
    .catch(err =>{
    console.log(err)
  });

 
};
