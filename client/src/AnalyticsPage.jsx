import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Revenue</p>
                <p className="text-2xl font-bold">$45,678</p>
                <p className="text-green-400 text-sm">+12.5% vs last month</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Orders</p>
                <p className="text-2xl font-bold">234</p>
                <p className="text-green-400 text-sm">+8.2% vs last month</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Customers</p>
                <p className="text-2xl font-bold">1,567</p>
                <p className="text-green-400 text-sm">+15.3% vs last month</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Products Sold</p>
                <p className="text-2xl font-bold">892</p>
                <p className="text-red-400 text-sm">-2.1% vs last month</p>
              </div>
              <div className="text-3xl">🛒</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
            <div className="h-64 bg-[#012A2D] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-300">Sales Chart</p>
                <p className="text-sm text-gray-400">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#012A2D] rounded">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💻</span>
                  <div>
                    <p className="font-medium">Gaming Laptop</p>
                    <p className="text-sm text-gray-300">45 units sold</p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">$58,500</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#012A2D] rounded">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🎧</span>
                  <div>
                    <p className="font-medium">Wireless Headphones</p>
                    <p className="text-sm text-gray-300">89 units sold</p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">$8,010</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#012A2D] rounded">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⌨️</span>
                  <div>
                    <p className="font-medium">Mechanical Keyboard</p>
                    <p className="text-sm text-gray-300">67 units sold</p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">$10,050</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Demographics */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customer Demographics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 18-25</span>
                <div className="flex items-center">
                  <div className="w-24 bg-[#012A2D] rounded-full h-2 mr-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <span className="text-sm">35%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 26-35</span>
                <div className="flex items-center">
                  <div className="w-24 bg-[#012A2D] rounded-full h-2 mr-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-sm">45%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 36-50</span>
                <div className="flex items-center">
                  <div className="w-24 bg-[#012A2D] rounded-full h-2 mr-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <span className="text-sm">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">In Stock</span>
                <span className="text-green-400 font-semibold">1,234 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Stock</span>
                <span className="text-yellow-400 font-semibold">23 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Out of Stock</span>
                <span className="text-red-400 font-semibold">7 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Value</span>
                <span className="text-blue-400 font-semibold">$89,456</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Order Fulfillment Rate</span>
                <span className="text-green-400 font-semibold">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="text-green-400 font-semibold">4.8/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Order Value</span>
                <span className="text-blue-400 font-semibold">$195.20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Return Rate</span>
                <span className="text-yellow-400 font-semibold">2.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 