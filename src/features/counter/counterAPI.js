// A mock function to mimic making an async request for data
export async function fetchCount(amount = 1) {
  const response = await fetch('http://localhost:8080');
  const data = await response.json();
  return { data };
}
