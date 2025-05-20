"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { api, SpectroData } from "@/lib/api";

// Mock user data for the dashboard
const mockUser = {
  principal: "2vxsx-fae",
  username: "Researcher01",
  balance: 2500,
  contributions: 12,
  upvotes: 45,
  downvotes: 2,
  memberSince: "2023-08-15",
};

// Mock activity data for charts
const activityData = [
  { month: "Jan", uploads: 2, views: 15, upvotes: 8 },
  { month: "Feb", uploads: 3, views: 22, upvotes: 12 },
  { month: "Mar", uploads: 1, views: 18, upvotes: 7 },
  { month: "Apr", uploads: 4, views: 31, upvotes: 16 },
  { month: "May", uploads: 2, views: 24, upvotes: 11 },
  { month: "Jun", uploads: 0, views: 12, upvotes: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function DashboardPage() {
  const [userUploads, setUserUploads] = useState<SpectroData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      try {
        // In a real implementation, we would fetch user-specific data
        // For now, let's simulate by filtering all data by the mock user principal
        const allData = await api.getAllSpectroData();
        const userUploads = allData.filter(item => item.submitter === mockUser.principal);
        setUserUploads(userUploads);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, []);
  
  // Data for technique distribution pie chart
  const techniqueDistribution = [
    { name: "UV-Vis", value: 5 },
    { name: "IR", value: 3 },
    { name: "Raman", value: 2 },
    { name: "NMR", value: 1 },
    { name: "Fluorescence", value: 1 },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {mockUser.username}. View your contribution stats and manage your uploads.
        </p>
      </div>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">DESPEC Balance</h3>
          <p className="text-2xl font-bold text-primary">{mockUser.balance}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Contributions</h3>
          <p className="text-2xl font-bold">{mockUser.contributions}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Upvotes Received</h3>
          <p className="text-2xl font-bold text-accent">{mockUser.upvotes}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Member Since</h3>
          <p className="text-xl font-medium">{mockUser.memberSince}</p>
        </div>
      </div>
      
      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h2 className="font-medium mb-4">Monthly Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                    border: "1px solid #334155",
                    borderRadius: "0.375rem",
                    color: "#f1f5f9",
                  }}
                />
                <Legend />
                <Bar dataKey="uploads" fill="#0ea5e9" name="Uploads" />
                <Bar dataKey="views" fill="#7c3aed" name="Views" />
                <Bar dataKey="upvotes" fill="#06b6d4" name="Upvotes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border">
          <h2 className="font-medium mb-4">Technique Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={techniqueDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {techniqueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                    border: "1px solid #334155",
                    borderRadius: "0.375rem",
                    color: "#f1f5f9",
                  }}
                  formatter={(value) => [`${value} spectra`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* User Uploads */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Uploads</h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            New Upload
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-2 text-muted-foreground">Loading your uploads...</p>
          </div>
        ) : userUploads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't uploaded any spectra yet.</p>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Upload Your First Spectrum
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Title</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Molecule</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Technique</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Uploaded</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Trust Score</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userUploads.map((upload) => {
                  const date = new Date(upload.created_at);
                  return (
                    <tr key={upload.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{upload.metadata.title}</td>
                      <td className="py-3 px-4 font-mono text-sm">{upload.metadata.molecule}</td>
                      <td className="py-3 px-4">{upload.metadata.technique}</td>
                      <td className="py-3 px-4">{date.toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm">
                          {upload.trust_score}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80">View</button>
                          <button className="text-muted-foreground hover:text-foreground">Edit</button>
                          <button className="text-destructive hover:text-destructive/80">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 