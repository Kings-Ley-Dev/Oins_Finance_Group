import { Link } from "react-router-dom";
import { LegalShell, Section, Bullets, Mail } from "@/components/common/Legal";

export default function Terms() {
  return (
    <LegalShell
      title="Terms of Use"
      updated="June 2026"
      intro="These Terms and Conditions govern your use of Oins Finance Group's website and services."
    >
      <Section title="About us">
        <p>
          Oins Finance Group (“we”, “us”, “our”) is a top-tier fiscal management platform, fully regulated
          in the EU and delivering tailored financial services to clienteles. We create suitable investment
          opportunities with the goal of meeting the financial objectives of clients - irrespective of their
          current financial position. Our focus is to provide high-value financial assets that ensure a
          stable return on our clients' investments.
        </p>
      </Section>

      <Section title="Our services">
        <p>We provide investors with collateral-backed opportunities across:</p>
        <Bullets items={[
          "Agriculture",
          "Oil and Gas",
          "Real Estate",
          "Digital Currency",
          "AI Stocks",
          "Mineral Resources",
          "Digital Banking",
          "Lending",
        ]} />
      </Section>

      <Section title="Your responsibilities">
        <p>To enable us to provide tailored investment needs and advice, you agree to:</p>
        <Bullets items={[
          "Provide accurate, complete, and up-to-date information when requested;",
          "Notify us promptly of any changes in your circumstances;",
          "Review all documents provided to you carefully and raise any queries before proceeding;",
          "Not provide false or misleading information to us.",
        ]} />
        <p>We accept no liability for any detriment arising from inaccurate or incomplete information provided by you.</p>
      </Section>

      <Section title="Third-party referrals">
        <p>
          In the course of providing our services, we may refer you to specialist third-party partners,
          including solicitors, surveyors, will writers, conveyancers, and other professional services. Any
          such referral is made in good faith and for your convenience only. It does not constitute advice or
          an endorsement of that party's services. Oins Finance Group is not responsible for the products,
          services, standards, or conduct of any third-party provider, and any arrangement you enter into
          with a third party is solely between you and that party. We recommend that you carry out your own
          due diligence before engaging any third-party service.
        </p>
      </Section>

      <Section title="Data protection and privacy">
        <p>
          Oins Finance Group processes your personal data in accordance with the EU Data Protection
          Regulation Act. We collect and use your personal data solely for the purposes of providing our
          services, complying with regulatory obligations, and maintaining our client relationship. We will
          never sell your personal data to third parties. For full details, please refer to our{" "}
          <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>, and for
          information on cookies, see our{" "}
          <Link to="/cookies" className="text-gold hover:underline">Cookie Policy</Link>.
        </p>
      </Section>

      <Section title="Communications">
        <p>
          By engaging our services, you consent to us contacting you by telephone or email for the purposes
          of managing your investments and providing ongoing service. You may opt out of marketing
          communications at any time by contacting us directly.
        </p>
      </Section>

      <Section title="Complaints">
        <p>
          We are committed to providing a high standard of service. If you are dissatisfied with any aspect
          of our service, please refer to our Complaints Policy for full details of how to raise a concern
          and what to expect from us.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the extent permitted by law, Oins Finance Group's liability to you in connection with our
          services shall not exceed the fee paid by you for the relevant service. We shall not be liable for
          any indirect, consequential, or economic loss.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These Terms and Conditions are governed by the laws of the EU. Any dispute arising from these
          Terms shall be subject to the exclusive jurisdiction of the courts of the United States, England
          and Wales.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          We reserve the right to update these Terms and Conditions at any time. The current version will
          always be available on our website. Continued use of our services following any update constitutes
          acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          Oins Finance Group<br />
          10837 Sanders Rd, Wise, Virginia<br />
          Tel: +1 (276) 885-5722<br />
          Email: <Mail /><br />
          Website: www.oinsfinancegroup.com
        </p>
      </Section>
    </LegalShell>
  );
}
