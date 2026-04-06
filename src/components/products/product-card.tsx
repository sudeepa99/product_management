"use client";

import Image from "next/image";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { DeleteProductDialog } from "@/components/products/delete-product-dialog";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-52 w-full bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <ImageOff className="h-8 w-8" />
              <span className="text-sm">No image</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Updated {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            ${product.price.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onEdit(product)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <DeleteProductDialog
          productName={product.name}
          onConfirm={() => onDelete(product.id)}
          trigger={
            <Button variant="destructive" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
