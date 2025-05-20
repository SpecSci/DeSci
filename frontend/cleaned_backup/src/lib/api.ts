// Mock data for development purposes
export interface SpectroData {
  id: number;
  submitter: string;
  created_at: number;
  trust_score: number;
  metadata: Record<string, string>;
  oracle_field: string;
  upvotes: string[];
  downvotes: string[];
}

export interface SpectraDataPoint {
  wavelength: number;
  intensity: number;
  [key: string]: any;
}

// Mock spectroscopy data
export const generateMockSpectraData = (length: number = 100): SpectraDataPoint[] => {
  const data: SpectraDataPoint[] = [];
  
  // Generate a mock absorption spectrum with some noise
  for (let i = 0; i < length; i++) {
    const wavelength = 200 + (i * 5); // 200nm to 700nm
    
    // Create a few mock absorption peaks
    let intensity = 0.1 + Math.random() * 0.1; // Base noise
    
    // Add peaks at specific wavelengths
    if (Math.abs(wavelength - 300) < 30) {
      intensity += 0.9 * Math.exp(-Math.pow(wavelength - 300, 2) / 100);
    }
    if (Math.abs(wavelength - 450) < 40) {
      intensity += 0.7 * Math.exp(-Math.pow(wavelength - 450, 2) / 200);
    }
    if (Math.abs(wavelength - 600) < 20) {
      intensity += 0.5 * Math.exp(-Math.pow(wavelength - 600, 2) / 50);
    }
    
    data.push({ wavelength, intensity });
  }
  
  return data;
};

// Mock SpectroData repository
const mockSpectroDataRepo: SpectroData[] = [
  {
    id: 1,
    submitter: '2vxsx-fae',
    created_at: Date.now() - 86400000 * 5, // 5 days ago
    trust_score: 85,
    metadata: {
      title: 'Benzene UV-Vis Absorption',
      molecule: 'C6H6',
      technique: 'UV-Vis',
      author: 'Dr. Alice Johnson',
      institution: 'University of Science',
      solvent: 'Cyclohexane',
      concentration: '0.1 mM'
    },
    oracle_field: '',
    upvotes: ['5acat-eaaaa-aaaaa-qaacq-cai', '6hsbt-vqaaa-aaaaa-qaaoa-cai'],
    downvotes: []
  },
  {
    id: 2,
    submitter: '3vbni-qae',
    created_at: Date.now() - 86400000 * 2, // 2 days ago
    trust_score: 92,
    metadata: {
      title: 'Naphthalene Fluorescence',
      molecule: 'C10H8',
      technique: 'Fluorescence',
      author: 'Prof. Bob Smith',
      institution: 'Tech University',
      excitation: '280 nm',
      solvent: 'Ethanol',
      concentration: '0.5 mM'
    },
    oracle_field: '',
    upvotes: ['5acat-eaaaa-aaaaa-qaacq-cai', '6hsbt-vqaaa-aaaaa-qaaoa-cai', '7ijwt-3yaaa-aaaaa-qaapa-cai'],
    downvotes: []
  },
  {
    id: 3,
    submitter: '7ijwt-3yaaa-aaaaa-qaapa-cai',
    created_at: Date.now() - 86400000 * 1, // 1 day ago
    trust_score: 78,
    metadata: {
      title: 'Methanol IR Spectrum',
      molecule: 'CH3OH',
      technique: 'IR',
      author: 'Dr. Carol Williams',
      institution: 'Research Institute',
      resolution: '2 cm-1',
      phase: 'Gas'
    },
    oracle_field: '',
    upvotes: ['5acat-eaaaa-aaaaa-qaacq-cai'],
    downvotes: ['3vbni-qae']
  }
];

// API class for Internet Computer interactions
export class SpectraNetApi {
  // In a real implementation, this would interact with the Internet Computer canister
  
  async getSpectroData(id: number): Promise<SpectroData | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = mockSpectroDataRepo.find(item => item.id === id);
    return data || null;
  }
  
  async searchSpectroData(query: Record<string, string>, limit: number = 10): Promise<SpectroData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter the mock data based on query parameters
    return mockSpectroDataRepo.filter(item => {
      for (const [key, value] of Object.entries(query)) {
        if (!item.metadata[key] || item.metadata[key].toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }
      return true;
    }).slice(0, limit);
  }
  
  async getSpectroDataPoints(id: number): Promise<SpectraDataPoint[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock spectroscopy data
    return generateMockSpectraData();
  }
  
  async getAllSpectroData(limit: number = 10): Promise<SpectroData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return mockSpectroDataRepo.slice(0, limit);
  }
  
  async submitSpectroData(
    metadata: Record<string, string>,
    dataPoints: SpectraDataPoint[]
  ): Promise<number> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real implementation, this would call the IC canister to store the data
    const newId = mockSpectroDataRepo.length + 1;
    
    // Return the new ID
    return newId;
  }
  
  async upvoteSpectroData(id: number): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Simulate successful upvote
    return true;
  }
  
  async downvoteSpectroData(id: number): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Simulate successful downvote
    return true;
  }
}

// Export a singleton instance of the API
export const api = new SpectraNetApi(); 