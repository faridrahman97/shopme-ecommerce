import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subTotal: 0,
  isCouponApplied: false,
  getCartItems: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data });
      get().calculateTotal();
    } catch (error) {
      set({ cart: [] });
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  addToCart: async (product) => {
    try {
      const res = await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart");
      set((prevState) => {
        const existingProduct = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingProduct
          ? prevState.cart.map((item) =>
              item._id == product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  calculateTotal: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subTotal;
    if (coupon) {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    set({ total, subTotal });
  },
  removeFromCart: async (productId) => {
    try {
      await axiosInstance.delete(`/cart`, { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  updateQuantity: async (productId, quantity) => {
    try {
      await axiosInstance.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));
      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  clearCart: async () => {
    try {
      await axiosInstance.delete("/cart");
      set({ cart: [], coupon: null, total: 0, subTotal: 0 });
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  getMyCoupon: async () => {
    try {
      const res = await axiosInstance.get("/coupons");
      set({ coupon: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotal();
    toast.success("Coupon removed");
  },
  applyCoupon: async (code) => {
    try {
      const res = await axiosInstance.post("/coupons/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred, try again"
      );
    }
  },
}));

export default useCartStore;
