// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve)=>{
  //TODO: we will not hardcode the server URL here
  const response = await fetch('http://localhost:3000/products')
  const data = await response.json()
  resolve({data})
  }
  );
}


export function fetchProductsByFilters(filter,sort,pagination) {
  //filter = {category:[],brand:[],price:[]}
  //sort = {price:for asc we use "+price",rating:we use "-rating"}
  //pagenation = {page:1,limit:10}
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
  console.log(pagination)

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async(resolve)=>{
  //TODO: we will not hardcode the server URL here
  const response = await fetch('http://localhost:3000/products?'+queryString)
  const data = await response.json()
  // resolve({data})
  const products = data.data;
  const totalItems = data.items;
  // const totalItems = await response.headers.get('X-Total-Count')
  // console.log(`this is totalItem ${totalItems}`)
  resolve({data: {products:products, totalItems:totalItems}})
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}

