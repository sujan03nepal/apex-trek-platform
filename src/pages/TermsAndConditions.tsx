import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <Layout>
      <section className="py-12 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            Terms and Conditions
          </h1>
          <p className="text-primary-foreground/80 mt-2">Last updated: March 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8 text-foreground">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">2. Trek Participation</h2>
              <p className="text-muted-foreground mb-4">
                All trekkers participate in treks at their own risk. Participants must be in good health and free from conditions that would make trekking dangerous. We recommend consulting with a doctor before booking high-altitude treks.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Participants must inform us of any medical conditions or allergies</li>
                <li>We reserve the right to refuse participation to anyone deemed unfit</li>
                <li>Proper acclimatization is essential and should not be rushed</li>
                <li>Participants must follow guide instructions at all times</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">3. Booking and Cancellation</h2>
              <p className="text-muted-foreground mb-4">
                Booking confirms your trek participation. Payment terms and cancellation policies are as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>50% deposit required to confirm booking</li>
                <li>Full payment due 30 days before trek commencement</li>
                <li>Cancellation within 60 days: 25% refund</li>
                <li>Cancellation within 30 days: No refund</li>
                <li>We reserve the right to cancel treks due to weather or safety concerns</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">4. Travel Insurance</h2>
              <p className="text-muted-foreground mb-4">
                We strongly recommend that all participants obtain comprehensive travel insurance covering:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Emergency evacuation to lower altitude or out of Nepal</li>
                <li>Medical expenses up to USD 100,000</li>
                <li>Trip cancellation and delays</li>
                <li>High altitude coverage (up to 6,500m for most treks)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">5. Liability and Responsibility</h2>
              <p className="text-muted-foreground mb-4">
                Nepal Treks is not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal injury or death caused by trekking</li>
                <li>Loss or damage to personal belongings</li>
                <li>Delays caused by weather, landslides, or natural disasters</li>
                <li>Illness or medical conditions related to altitude</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Participants assume all risks associated with trekking. We maintain the highest safety standards but cannot guarantee incident-free trekking experiences.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">6. Guide Conduct</h2>
              <p className="text-muted-foreground mb-4">
                Our guides are trained, certified, and experienced. They have authority to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Alter the itinerary for safety reasons</li>
                <li>Require trekkers to descend if altitude sickness is suspected</li>
                <li>Dismiss trekkers for misconduct</li>
                <li>Make emergency decisions in the interest of the group</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">7. Intellectual Property Rights</h2>
              <p className="text-muted-foreground">
                All content on our website, including text, graphics, logos, and images, is the property of Nepal Treks. Reproduction without permission is prohibited.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Nepal Treks be liable for any damages arising out of or in connection with your use of this website or participation in any trek, including indirect, incidental, special, or consequential damages.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws of Nepal, and any disputes shall be subject to the exclusive jurisdiction of the courts of Kathmandu.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-2">
                If you have questions about these terms and conditions, please contact:
              </p>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="font-medium text-foreground">Nepal Treks</p>
                <p className="text-muted-foreground">Thamel, Kathmandu, Nepal</p>
                <p className="text-muted-foreground">Email: info@nepaltreks.com</p>
                <p className="text-muted-foreground">Phone: +977 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
