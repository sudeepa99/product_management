"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/layout/app-header";
import { ProductForm } from "@/components/products/product-form";
import { ProductList } from "@/components/products/product-list";
import { ProductSearch } from "@/components/products/product-search";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/types";
import { ProductFormValues } from "@/lib/validations/product-schema";
import { useProducts } from "@/hooks/use-products";

export default function HomePage() {
  const {
    products,
    filteredProducts,
    search,
    setSearch,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoaded,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, values);
      toast.success("Product updated successfully");
      setEditingProduct(null);
      return;
    }

    addProduct(values);
    toast.success("Product added successfully");
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
    toast.success("Product deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 xl:grid-cols-[380px_1fr]">
          <aside className="xl:sticky xl:top-8 xl:self-start">
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleSubmit}
              onCancelEdit={() => setEditingProduct(null)}
            />
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Products
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Track, search, edit, and manage your saved products.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total products:{" "}
                  <span className="font-semibold text-foreground">
                    {products.length}
                  </span>
                </div>
              </div>

              <Separator className="my-5" />
              <ProductSearch value={search} onChange={setSearch} />
            </div>

            {!isLoaded ? (
              <div className="rounded-3xl border bg-card p-8 text-sm text-muted-foreground shadow-sm">
                Loading products...
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
                hasSearch={Boolean(search.trim())}
              />
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
