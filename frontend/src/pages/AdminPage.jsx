import React from "react";
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import CreateProduct from "../components/CreateProduct";
import ManageProducts from "../components/ManageProducts";
import Analytics from "../components/Analytics";
import useProductStore from "../stores/useProductStore";
import useTitle from "../hooks/useTitle";

const tabs = [
  { name: "create", label: "Create Product", icon: PlusCircle },
  { name: "products", label: "Manage Products", icon: ShoppingBasket },
  { name: "analytics", label: "View Analytics", icon: BarChart },
];
const AdminPage = () => {
  useTitle("Admin Dashboard");
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  React.useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <section className="min-h-screen flex flex-col text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-blue-500 text-4xl font-bold mb-8"
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md duration-200 ${
                activeTab === tab.name
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProduct />}
        {activeTab === "products" && <ManageProducts />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </section>
  );
};

export default AdminPage;
