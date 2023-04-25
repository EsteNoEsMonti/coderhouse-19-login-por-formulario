import { productManager, productsModel } from '../managers/ProductManager.js';


export async function getAllProductsController(req, res, next) {
  try {
    let paginateOptions = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      lean: true
    }
    const queryParams = req.query
    await delete queryParams.limit
    await delete queryParams.page

    // TODO: check sort fn
    if (req.query.sort) {
      paginateOptions = {
        ...paginateOptions,
        sort: { price: req.query.sort || 'asc' }
      }
    }

    // @ts-ignore
    let result = await productsModel.paginate(req.query, paginateOptions)
    // console.log(result)

    const context = {
      status: res.status,
      pageTitle: 'Products',
      hasDocs: result.docs.length > 0,
      docs: result.docs,
      limit: result.limit,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      hasPrevPage: result.hasPrevPage,
      prevPage: result.prevPage,
      pagingCounter: result.pagingCounter,
      nextLink: createUrlNextPage(result.hasNextPage, result.nextPage, req.url),
      prevLink: createUrlPrevPage(result.hasPrevPage, result.prevPage, req.url),
      user: req.session['user']
    }

    const products = await productManager.getAllProducts();
    res.render('products', context);
  } catch (error) {
    next(error);
  }
}

export async function getProductByIdController(req, res, next) {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.render('product', {
      pageTitle: 'Product',
      product: product
    });
  } catch (error) {
    next(error);
  }
}

function createUrlNextPage(hasNextPage, nextPage, url) {
  const parsedUrl = new URL(url, 'http://localhost:8080');
  const query = parsedUrl.searchParams;

  if (hasNextPage) {
    query.set('page', nextPage);
    parsedUrl.search = query.toString();
    return parsedUrl.toString();
  }

  return null;
}

function createUrlPrevPage(hasPrevPage, prevPage, url) {
  const parsedUrl = new URL(url, 'http://localhost:8080');
  const query = parsedUrl.searchParams;

  if (hasPrevPage) {
    query.set('page', prevPage);
    parsedUrl.search = query.toString();
    return parsedUrl.toString();
  }

  return null;
}
