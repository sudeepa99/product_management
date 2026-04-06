"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  productSchema,
  ProductFormInput,
  ProductFormValues,
} from "@/lib/validations/product-schema";
import { Product } from "@/lib/types";

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (values: ProductFormValues) => void;
  onCancelEdit?: () => void;
}

export function ProductForm({
  initialData,
  onSubmit,
  onCancelEdit,
}: ProductFormProps) {
  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      form.reset({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);

    if (!initialData) {
      form.reset({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
      });
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          {initialData ? "Edit product" : "Add new product"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {initialData
            ? "Update the selected product details."
            : "Fill in the details to create a new product entry."}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="MacBook Air M3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="999.99"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={
                      typeof field.value === "string" ||
                      typeof field.value === "number"
                        ? field.value
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A lightweight laptop with strong battery life and performance."
                    className="min-h-28 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {initialData ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add product
                </>
              )}
            </Button>

            {initialData && (
              <Button type="button" variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
