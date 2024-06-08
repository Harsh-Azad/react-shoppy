// // A mock function to mimic making an async request for data
// export async function fetchCount(amount = 1) {
//   const response = await fetch('http://localhost:3001');
//   const data = await response.json();
//   return { data };
// }
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/products') 
    const data = await response.json()
    resolve({data})
  }
  );
}