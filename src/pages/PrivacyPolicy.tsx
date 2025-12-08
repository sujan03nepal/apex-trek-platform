import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="py-12 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 mt-2">Last updated: March 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8 text-foreground">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Nepal Treks ("we," "us," or "our") operates the nepaltreks.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">1. Information Collection and Use</h2>
              <p className="text-muted-foreground mb-4">
                We collect several different types of information for various purposes to provide and improve our service:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Data:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Passport information (for bookings)</li>
                    <li>Emergency contact information</li>
                    <li>Medical information (altitude sickness history, allergies)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Browser type and version</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                    <li>IP address</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">2. Use of Data</h2>
              <p className="text-muted-foreground mb-4">
                Nepal Treks uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our website and services</li>
                <li>To notify you about changes to our services</li>
                <li>To allow you to participate in interactive features</li>
                <li>To send marketing and promotional emails (with your consent)</li>
                <li>To gather analysis or valuable information to improve our service</li>
                <li>To monitor the usage of our website</li>
                <li>To process your trek bookings and payments</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">3. Security of Data</h2>
              <p className="text-muted-foreground mb-4">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
              <p className="text-muted-foreground">
                We implement industry-standard security measures including SSL encryption for sensitive information like payment details and medical data.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">4. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Our website uses cookies to enhance your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">5. Links to Other Sites</h2>
              <p className="text-muted-foreground">
                Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the privacy policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">6. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our website is not intended for children under 18. We do not knowingly collect personal information from children under 18. If we discover that a child under 18 has provided us with personal information, we will immediately delete such information and terminate the child's account.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data (right to be forgotten)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "effective date" at the top of this page.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy, please contact us:
              </p>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="font-medium text-foreground">Nepal Treks</p>
                <p className="text-muted-foreground">Thamel, Kathmandu, Nepal</p>
                <p className="text-muted-foreground">Email: privacy@nepaltreks.com</p>
                <p className="text-muted-foreground">Phone: +977 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
