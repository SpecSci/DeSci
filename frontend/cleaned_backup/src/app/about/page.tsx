import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">About SpectraNet</h1>
          <p className="text-muted-foreground">
            Learn about our mission, technology, and the team behind SpectraNet.
          </p>
        </div>
        
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="mb-4">
              SpectraNet is dedicated to democratizing access to molecular spectroscopy data through decentralized blockchain technology. Our platform enables researchers, scientists, and enthusiasts to share, explore, and verify spectroscopic data in a transparent and trustworthy environment.
            </p>
            <p>
              By leveraging the power of the Internet Computer blockchain, we're building a permanent, censorship-resistant repository of spectroscopic data that can accelerate scientific discovery and collaboration across the globe.
            </p>
          </div>
        </section>
        
        {/* Internet Computer Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Powered by Internet Computer</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48">
                  <Image
                    src="/ic-logo.svg"
                    alt="Internet Computer Logo"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-medium mb-2">Why Internet Computer?</h3>
                <p className="mb-4">
                  The Internet Computer is a revolutionary blockchain that provides web-speed, web-serving public blockchain functionality. This allows SpectraNet to serve web content directly from the blockchain.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Smart contracts that can serve web content directly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Scalable, secure, and sustainable infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Decentralized data storage ensuring longevity and censorship resistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Native token support through the DESPEC token (ICRC-1 standard)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* DESPEC Token Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The DESPEC Token</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="mb-4">
              DESPEC is our platform's native utility token that powers the SpectraNet ecosystem, facilitating governance, incentives, and data curation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-background p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Data Contribution Rewards</h3>
                <p className="text-muted-foreground text-sm">
                  Earn DESPEC tokens by contributing high-quality spectroscopy data to the repository. Higher trust scores lead to better rewards.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Data Verification</h3>
                <p className="text-muted-foreground text-sm">
                  Stake DESPEC tokens when upvoting or verifying data, encouraging accurate curation and high data quality.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Governance</h3>
                <p className="text-muted-foreground text-sm">
                  DESPEC holders can participate in platform governance, voting on proposals and feature updates.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Advanced Features</h3>
                <p className="text-muted-foreground text-sm">
                  Use DESPEC tokens to access premium features like advanced analytics, bulk downloads, and API access.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/team-member-1.jpg"
                      alt="Dr. Emily Chen"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <h3 className="font-medium">Dr. Emily Chen</h3>
                <p className="text-sm text-muted-foreground">Founder & Lead Scientist</p>
                <p className="text-xs mt-2">Spectroscopy Expert with 10+ years of research experience</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/team-member-2.jpg"
                      alt="Michael Rodriguez"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <h3 className="font-medium">Michael Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Blockchain Developer</p>
                <p className="text-xs mt-2">Internet Computer specialist and systems architect</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/team-member-3.jpg"
                      alt="Dr. Sarah Kim"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <h3 className="font-medium">Dr. Sarah Kim</h3>
                <p className="text-sm text-muted-foreground">Data Science Lead</p>
                <p className="text-xs mt-2">ML/AI expert specializing in spectral analysis</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become part of the SpectraNet community and help us build the future of decentralized spectroscopy data.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Start Contributing
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-background border border-border text-foreground px-6 py-3 rounded-md font-medium hover:bg-muted transition-colors">
              GitHub Repository
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors">
              Join Discord
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 