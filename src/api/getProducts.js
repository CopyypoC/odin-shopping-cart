export async function getProducts(controllerSignal) {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      signal: controllerSignal,
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
