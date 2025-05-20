import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/90" />
        <div className="absolute inset-0 opacity-30 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SpectraNet
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto">
            A decentralized molecular spectroscopy data repository and exploration tool, powered by the Internet Computer blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorer" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Explore Data
            </Link>
            <Link href="/upload" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors">
              Upload Spectra
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why SpectraNet?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-md border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralized Storage</h3>
              <p className="text-muted-foreground">
                Your spectroscopy data is stored on the Internet Computer blockchain, ensuring permanence and censorship resistance.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Visualization</h3>
              <p className="text-muted-foreground">
                Explore spectroscopy data with interactive visualizations. Zoom, pan, and analyze with ease.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trustworthy Data</h3>
              <p className="text-muted-foreground">
                Community-verified spectra with trust scores ensure high-quality, reliable spectroscopy data.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">SpectraNet in Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">240+</p>
              <p className="text-muted-foreground">Spectra Uploaded</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">54</p>
              <p className="text-muted-foreground">Research Groups</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">18</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">5,200+</p>
              <p className="text-muted-foreground">Data Points</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to contribute?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of researchers, scientists, and spectroscopy enthusiasts. 
            Share your data and help build a comprehensive open repository for molecular spectroscopy.
          </p>
          <Link href="/upload" className="bg-accent text-accent-foreground px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
