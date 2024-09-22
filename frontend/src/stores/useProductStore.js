import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products", product);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data.message || "An error occurred, try again"
      );
    }
  },
  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data.message || "An error occurred, try again"
      );
    }
  },
  getRecommendedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products/recommendations");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products/featured");
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
}));

export default useProductStore;
