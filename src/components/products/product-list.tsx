import { Product } from "@/lib/types";
import { ProductCard } from "@/components/products/product-card";
import { EmptyState } from "@/components/products/empty-state";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  hasSearch?: boolean;
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  hasSearch = false,
}: ProductListProps) {
  if (!products.length) {
    return hasSearch ? (
      <EmptyState
        title="No matching products"
        description="Try another keyword or clear the search to view all saved products."
      />
    ) : (
      <EmptyState
        title="No products yet"
        description="Add your first product using the form to start building your product list."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
