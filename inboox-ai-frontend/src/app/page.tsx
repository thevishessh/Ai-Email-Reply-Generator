import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      {/* Testimonials (Simplified for now) */}
      <section className="py-24 bg-surface-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-surface rounded-2xl border border-border">
              <p className="text-xl italic mb-6 text-foreground/80">
                "Inboox AI has transformed how I handle client communications. I save at least 2 hours every day."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-ai-gradient" />
                <div>
                  <div className="font-bold">David Miller</div>
                  <div className="text-sm text-foreground/50">Senior Project Manager</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface rounded-2xl border border-border">
              <p className="text-xl italic mb-6 text-foreground/80">
                "The tone customization is spot on. My clients can't even tell it's AI-generated. Absolutely essential."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-ai-gradient" />
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-sm text-foreground/50">Freelance Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-foreground/60">Choose the plan that fits your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", features: ["5 AI generations/month", "Standard support", "Basic tones"] },
              { name: "Pro", price: "$19", features: ["Unlimited AI generations", "Priority support", "All tones & custom tones", "History tracking"], popular: true },
              { name: "Enterprise", price: "Custom", features: ["Custom AI training", "Dedicated account manager", "API access", "SSO & Security"] }
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-3xl border flex flex-col ${plan.popular ? 'border-primary ring-2 ring-primary/20 shadow-2xl' : 'border-border bg-surface'}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-sm font-normal text-foreground/40">{plan.price !== "Custom" && "/mo"}</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center space-x-3 text-sm text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-ai-gradient text-white' : 'bg-surface-light hover:bg-border'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Master Your Inbox?</h2>
          <p className="text-xl text-foreground/60 mb-10">
            Join thousands of professionals who have found effortless mastery in their communication.
          </p>
          <button className="bg-ai-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/20">
            Start Your Free Trial
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
