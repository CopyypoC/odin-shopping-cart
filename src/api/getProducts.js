export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}
