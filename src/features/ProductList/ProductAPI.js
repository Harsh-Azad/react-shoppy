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

export function fetchProductsByFilters(filter) {
  //filter:{"category":"smartphone"}
  //TO DO: support multiple filters
  //also brand not working properly look into it
  let queryString = '';
  for (let key in filter){
    queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async(resolve)=>{
  //TODO: we will not hardcode the server URL here
  const response = await fetch('http://localhost:3000/products?'+queryString)
  const data = await response.json()
  resolve({data})
  }
  );
}

