import React from "react";

export default function AnalyticsPage() {
  // Demo data for charts
  const salesData = [
    { month: 'Jan', sales: 12000, revenue: 15000 },
    { month: 'Feb', sales: 15000, revenue: 18000 },
    { month: 'Mar', sales: 18000, revenue: 22000 },
    { month: 'Apr', sales: 16000, revenue: 20000 },
    { month: 'May', sales: 20000, revenue: 25000 },
    { month: 'Jun', sales: 22000, revenue: 28000 }
  ];

  const profitLossData = [
    { category: 'Profit', value: 45000, color: '#10B981' },
    { category: 'Loss', value: 8000, color: '#EF4444' },
    { category: 'Expenses', value: 12000, color: '#F59E0B' }
  ];

  const totalValue = profitLossData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>
        
        {/* Key Metrics - 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Sales</p>
                <p className="text-2xl font-bold">$1,739.49</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">This Month</p>
                <p className="text-2xl font-bold">$1,250.00</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sales & Revenue Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center space-y-1 mb-2">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.sales / 25000) * 120}px` }}
                    ></div>
                    <div 
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${(data.revenue / 30000) * 120}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-300">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-xs">Sales</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-xs">Revenue</span>
              </div>
            </div>
          </div>

          {/* Profit/Loss Pie Chart */}
          <div className="bg-[#435355] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profit & Loss Analysis</h2>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                {/* Pie Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {profitLossData.map((item, index) => {
                    const percentage = (item.value / totalValue) * 100;
                    const previousPercentages = profitLossData
                      .slice(0, index)
                      .reduce((sum, prevItem) => sum + (prevItem.value / totalValue) * 100, 0);
                    
                    const startAngle = (previousPercentages / 100) * 360;
                    const endAngle = ((previousPercentages + percentage) / 100) * 360;
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const largeArcFlag = percentage > 50 ? 1 : 0;
                    
                    return (
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="#012A2D"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-sm text-gray-300">${totalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              {profitLossData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <span className="text-sm font-semibold">${item.value.toLocaleString()}</span>
                </div>
              ))}
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