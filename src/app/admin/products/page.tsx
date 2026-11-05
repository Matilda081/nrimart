"use client";

import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiRefreshCw,
  FiX,
  FiSave,
} from "react-icons/fi";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  stock: number;
  isAvailable: boolean;
};

const initialForm = {
  name: "",
  description: "",
  price: "",
  weight: "5kg",
  image: "/images/products/rice-5kg.jpeg",
  stock: "0",
};

const riceImages: Record<string, string> = {
  "5kg": "/images/products/rice-5kg.jpeg",
  "10kg": "/images/products/rice-10kg.jpeg",
  "25kg": "/images/products/rice-25kg.jpeg",
  "50kg": "/images/products/rice-50kg.jpeg",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load products");
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "weight" &&
      previous.image === riceImages[previous.weight]
        ? { image: riceImages[value] }
        : {}),
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // Add or update product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim() || !form.image.trim()) {
      toast.error("Please fill in all product details");
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid product price");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      toast.error("Enter a valid stock quantity");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim(),
            price,
            weight: form.weight,
            image: form.image.trim(),
            stock,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        editingId
          ? "Product updated successfully"
          : "Product added successfully"
      );

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  // Load product into the form for editing
  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      weight: product.weight,
      image: product.image,
      stock: String(product.stock),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete product
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this rice product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete product");
      }

      toast.success("Product deleted successfully");

      if (editingId === id) {
        resetForm();
      }

      await fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to delete product"
      );
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-[#f8faf6] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#6b8f3e]">
              NriMart Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#173d2b] sm:text-4xl">
              Rice Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add, update and manage your rice catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchProducts}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-[#173d2b] shadow-sm transition hover:bg-gray-50"
          >
            <FiRefreshCw />
            Refresh Products
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h2 className="mt-2 text-3xl font-bold text-[#173d2b]">
                  {products.length}
                </h2>
              </div>

              <div className="rounded-xl bg-green-50 p-4 text-2xl text-green-700">
                <FiPackage />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Available Products</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {products.filter((product) => product.stock > 0).length}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {products.filter((product) => product.stock === 0).length}
            </h2>
          </div>
        </div>

        {/* Product form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#173d2b]">
                {editingId ? "Edit Rice Product" : "Add New Rice Product"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the details of your rice product below.
              </p>
            </div>

            <div className="hidden rounded-xl bg-green-50 p-3 text-xl text-green-700 sm:block">
              {editingId ? <FiEdit2 /> : <FiPlus />}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Product name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Nigerian Rice"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Rice Weight
                </label>

                <select
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                >
                  <option value="5kg">5kg</option>
                  <option value="10kg">10kg</option>
                  <option value="25kg">25kg</option>
                  <option value="50kg">50kg</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (₦)
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter selling price"
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Enter available quantity"
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Image path */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Image Path
                </label>

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/products/rice-5kg.jpeg"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Enter the path of an image inside your public folder.
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your rice product..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Form buttons */}
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#173d2b] px-7 py-3.5 font-semibold text-white transition hover:bg-[#24563c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  "Saving..."
                ) : editingId ? (
                  <>
                    <FiSave /> Update Product
                  </>
                ) : (
                  <>
                    <FiPlus /> Add Product
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <FiX /> Cancel Editing
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product list */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#173d2b]">
              All Rice Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage products currently saved in your database.
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              <FiRefreshCw className="mx-auto mb-3 animate-spin text-3xl" />
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl bg-[#f8faf6] px-5 py-14 text-center">
              <FiPackage className="mx-auto mb-3 text-4xl text-gray-400" />

              <h3 className="font-bold text-gray-700">
                No products available yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add your first rice product using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 transition hover:shadow-md"
                >
                  <div className="h-48 bg-[#f8faf6] p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full rounded-xl object-contain"
                    />
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#173d2b]">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.weight}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-lg font-extrabold text-[#173d2b]">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-100"
                      >
                        <FiEdit2 /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}