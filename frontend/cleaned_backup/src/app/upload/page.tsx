"use client";

import { UploadForm } from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div 
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Upload Spectroscopy Data</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contribute to the decentralized spectroscopy repository by uploading your data.
            All submissions are verified and stored on the Internet Computer blockchain.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h2 className="text-xl font-semibold mb-4">Guidelines for Submission</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Upload CSV or TXT files containing wavelength and intensity data.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Provide accurate metadata to help others find and understand your data.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Include a brief description of the experimental conditions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>All data will be assigned a trust score based on community verification.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Earn DESPEC tokens for valuable contributions to the repository.</span>
            </li>
          </ul>
        </div>
        
        <UploadForm />
        
        <div className="mt-12 bg-muted p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Accepted Data Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">CSV Format</h3>
              <pre className="bg-background p-3 rounded-md text-xs font-mono overflow-x-auto">
                {`wavelength,intensity
200.0,0.12
201.0,0.14
202.0,0.18
203.0,0.22
204.0,0.25
...`}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">TXT Format</h3>
              <pre className="bg-background p-3 rounded-md text-xs font-mono overflow-x-auto">
                {`# Spectroscopy Data
# Molecule: C6H6
# Date: 2023-11-15
# Format: wavelength intensity
200.0 0.12
201.0 0.14
202.0 0.18
203.0 0.22
204.0 0.25
...`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 