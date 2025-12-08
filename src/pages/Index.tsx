import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedTreks } from "@/components/home/FeaturedTreks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedTreks />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
