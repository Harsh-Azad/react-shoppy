// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve)=>{
  //TODO: we will not hardcode the server URL here
  const response = await fetch('http://localhost:8080/products')
  const data = await response.json()
  resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter,sort,pagination) {
  //filter = {category:[],brand:[],price:[]}
  //sort = {price:for asc we use "+price",rating:we use "-rating"}
  //Pagination = {page:1,limit:10}
  //TODO: deleted product should be removed from backend
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  // console.log(pagination)

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async(resolve)=>{
  //TODO: we will not hardcode the server URL here
  console.log(queryString,"query string");
  const response = await fetch('http://localhost:8080/products?'+queryString)
  console.log(response); // This will log the server response
  const realdata = await response.json()
  console.log(realdata,"real data"); // This will log the real data
  const data = realdata.docs;
  console.log(data); // This will log the data
  
  // const products = data.data;
  const totalItems = realdata.totalDocs;
  console.log(totalItems);
  // console.log(products);
  // console.log(totalItems);
  // resolve({data: {products:products, totalItems:totalItems}})

//  const totalItems = await response.headers.get('X-Total-Count')
  resolve({data:{products:data,totalItems:totalItems}})
  console.log(data,"yehe pe bhaaari gadbad hai");
  console.log(totalItems,"total items");
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}



