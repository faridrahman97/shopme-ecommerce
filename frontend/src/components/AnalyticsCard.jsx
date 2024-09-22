import React from "react";
import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      className={`bg-slate-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-blue-300 text-sm mb-1 font-semibold">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-30" />
      <div className="absolute -bottom-4 -right-4 text-blue-800 opacity-50">
        <Icon className="h-32 w-32" />
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
