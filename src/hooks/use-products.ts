"use client";

import * as React from "react";
import { useLocalStorage } from "./use-local-storage";
import { Product } from "../lib/types";
import { ProductFormValues } from "../lib/validations/product-schema";

const STORAGE_KEY = "products";

function createProduct(data: ProductFormValues): Product {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: data.name,
    price: data.price,
    description: data.description,
    imageUrl: data.imageUrl || "",
    createdAt: now,
    updatedAt: now,
  };
}

export function useProducts() {
  const { storedValue, setValue, isLoaded } = useLocalStorage<Product[]>(
    STORAGE_KEY,
    [],
  );
  const [search, setSearch] = React.useState("");

  const addProduct = (data: ProductFormValues) => {
    const newProduct = createProduct(data);
    setValue((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, data: ProductFormValues) => {
    setValue((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...data,
              imageUrl: data.imageUrl || "",
              updatedAt: new Date().toISOString(),
            }
          : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setValue((prev) => prev.filter((product) => product.id !== id));
  };

  const filteredProducts = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return storedValue;

    return storedValue.filter((product) =>
      [product.name, product.description]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [storedValue, search]);

  return {
    products: storedValue,
    filteredProducts,
    search,
    setSearch,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoaded,
  };
}
