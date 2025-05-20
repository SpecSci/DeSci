"use client";

import { useState, useEffect } from "react";
import { SpectraChart } from "@/components/SpectraChart";
import { api, SpectroData, SpectraDataPoint } from "@/lib/api";

export default function ExplorerPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SpectroData[]>([]);
  const [selectedData, setSelectedData] = useState<SpectroData | null>(null);
  const [spectraPoints, setSpectraPoints] = useState<SpectraDataPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTechnique, setFilterTechnique] = useState<string>("all");
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allData = await api.getAllSpectroData();
        setData(allData);
        if (allData.length > 0) {
          setSelectedData(allData[0]);
          const points = await api.getSpectroDataPoints(allData[0].id);
          setSpectraPoints(points);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  const handleSelectSpectra = async (selected: SpectroData) => {
    setSelectedData(selected);
    try {
      const points = await api.getSpectroDataPoints(selected.id);
      setSpectraPoints(points);
    } catch (error) {
      console.error("Failed to fetch spectra points:", error);
    }
  };
  
  const filteredData = data.filter(item => {
    // Filter by search query across all metadata fields
    const matchesSearch = searchQuery === "" || 
      Object.values(item.metadata).some(value => 
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Filter by technique if not "all"
    const matchesTechnique = filterTechnique === "all" || 
      item.metadata.technique?.toLowerCase() === filterTechnique.toLowerCase();
    
    return matchesSearch && matchesTechnique;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Spectroscopy Explorer</h1>
        <p className="text-muted-foreground">
          Browse, filter, and analyze spectroscopy data from the SpectraNet repository.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters and List */}
        <div className="lg:col-span-1">
          <div className="bg-card p-4 rounded-lg border border-border mb-4">
            <h2 className="font-medium mb-4">Search & Filter</h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search spectra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-2">Technique</label>
              <select
                value={filterTechnique}
                onChange={(e) => setFilterTechnique(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Techniques</option>
                <option value="UV-Vis">UV-Vis</option>
                <option value="Fluorescence">Fluorescence</option>
                <option value="IR">IR</option>
                <option value="Raman">Raman</option>
                <option value="NMR">NMR</option>
              </select>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-lg border border-border">
            <h2 className="font-medium mb-4">Available Spectra</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="mt-2 text-muted-foreground">Loading spectra...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No spectra found matching your filters.</p>
            ) : (
              <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                {filteredData.map((item) => (
                  <li 
                    key={item.id}
                    onClick={() => handleSelectSpectra(item)}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedData?.id === item.id 
                        ? "bg-primary/20 border border-primary/50" 
                        : "hover:bg-muted border border-transparent"
                    }`}
                  >
                    <h3 className="font-medium text-sm">{item.metadata.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{item.metadata.molecule}</span>
                      <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full">
                        {item.metadata.technique}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Main Content - Visualization and Details */}
        <div className="lg:col-span-3">
          {selectedData ? (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedData.metadata.title}</h2>
                    <p className="text-muted-foreground">
                      {selectedData.metadata.molecule} • {selectedData.metadata.technique}
                    </p>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-md">
                    <span className="text-sm font-medium text-primary">
                      Trust Score: {selectedData.trust_score}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Author</h3>
                    <p className="font-medium">{selectedData.metadata.author || "Unknown"}</p>
                  </div>
                  {selectedData.metadata.institution && (
                    <div>
                      <h3 className="text-sm text-muted-foreground">Institution</h3>
                      <p className="font-medium">{selectedData.metadata.institution}</p>
                    </div>
                  )}
                  {selectedData.metadata.solvent && (
                    <div>
                      <h3 className="text-sm text-muted-foreground">Solvent</h3>
                      <p className="font-medium">{selectedData.metadata.solvent}</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <SpectraChart 
                    data={spectraPoints} 
                    title={`${selectedData.metadata.molecule} - ${selectedData.metadata.technique}`}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Download Data
                  </button>
                  <button className="bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Upvote ({selectedData.upvotes.length})
                  </button>
                </div>
              </div>
              
              {selectedData.metadata.description && (
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedData.metadata.description}
                  </p>
                </div>
              )}
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-4">Additional Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedData.metadata)
                    .filter(([key]) => !['title', 'molecule', 'technique', 'author', 'institution', 'description'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="font-mono text-sm">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <h2 className="text-xl font-medium mb-2">No Spectrum Selected</h2>
              <p className="text-muted-foreground mb-4">
                Please select a spectrum from the list to view details and visualization.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 