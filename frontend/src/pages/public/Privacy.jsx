import { LegalShell, Section, SubHeading, Bullets, Mail } from "@/components/common/Legal";

export default function Privacy() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="June 2026"
      intro="This Privacy Policy explains how Oins Finance Group collects, uses, discloses, and safeguards your information when you use our Services through our website."
    >
      <Section>
        <p>
          Oins Finance Group (“Oins Finance Group,” “we,” “us,” or “our”) respects the privacy of its
          Users (“User,” “your,” or “you”). This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use Oins Finance Group's Services through our website
          at www.oinsfinancegroup.com.
        </p>
        <p>
          Oins Finance Group is a top-tier fiscal management platform that offers comprehensive
          investment opportunities, connecting investors with collateral-backed opportunities across
          agriculture, energy, real estate, technology and more - under a fully regulated, transparent
          framework built for consistent, secure returns. This makes it easy for individuals to invest
          in, monitor, and manage their investments remotely.
        </p>
        <p>
          Please read this Privacy Policy carefully to understand our policies and practices regarding
          your information. By accessing or using our Website and Services, you agree to accept the terms
          contained in this Privacy Policy. If you do not agree, please do not access or use our Website
          and Services. We do not sell your personal information, nor do we intend to do so. Questions?
          Email us at <Mail />.
        </p>
      </Section>

      <Section title="What information do we collect?">
        <p>
          When you register to use our Website or Services, we collect personal information (also referred
          to as personally identifiable information, or “PII”) which may include your name, address,
          online contact information such as your email address or username, phone number, and other
          personal information. This information is stored on our servers. You can change your personal
          information through your profile or account settings, or by contacting us at <Mail />.
        </p>
        <SubHeading>Geolocation and equipment information</SubHeading>
        <p>
          We may collect information that does not personally identify you, such as your geolocation and
          information about your internet connection, the equipment you use to access our Website or
          Services, and usage details.
        </p>
      </Section>

      <Section title="How do we collect information?">
        <p>We collect personal information from you in the following ways:</p>
        <Bullets items={[
          "At registration on our Website;",
          "In email, text, and other electronic messages between you and our Website;",
          "Through mobile and desktop applications you download from our Website;",
          "When you interact with our advertising and applications on third-party websites and services;",
          "From you placing an order, which includes details of transactions you carry out on our Website;",
          "When you subscribe to a newsletter, respond to a survey, or fill out forms;",
          "From records or copies of correspondence if you contact us;",
          "From search queries on our Website; and when you post information to be displayed on our Website.",
        ]} />
        <p>We also collect information automatically as you navigate the Website, including usage details, IP addresses, information from browser and flash cookies, web beacons, and other tracking technologies.</p>
      </Section>

      <Section title="How do we use your information?">
        <p>We use the information you provide to:</p>
        <Bullets items={[
          "Personalize your experience and present our Website and Services to you;",
          "Provide information, products, or services you request from us;",
          "Carry out obligations and enforce rights arising from contracts, including billing and collection;",
          "Notify you about changes to our Website, Services, products, or terms;",
          "Improve the Website, Services, and our customer service;",
          "Administer contests, promotions, and surveys; and process transactions;",
          "Anonymize and aggregate data for statistics; and contact you with your consent;",
          "Send periodic emails to respond to inquiries, process orders, and share relevant updates.",
        ]} />
      </Section>

      <Section title="How do we protect the information we collect?">
        <p>
          Our Website is reasonably scanned to meet or exceed PCI Compliance and receives regular security
          scans, penetration tests, and malware scans. We use an SSL certificate as an added security
          measure and require usernames and passwords for employees who can access your personal
          information. We accept payment by bank transfer and cryptocurrencies, and implement reasonable
          security measures whenever you place an order, submit or access your information, register, or
          access our Services.
        </p>
        <SubHeading>Data security measures</SubHeading>
        <p>
          All information you provide is stored on our secure servers behind firewalls. The safety of your
          information also depends on you: where you have a password for access to certain parts of our
          Website, you are responsible for keeping it confidential. Unfortunately, transmission of
          information via the internet is not completely secure, and any transmission is at your own risk.
        </p>
        <p>
          In the event of a personal data breach, we will notify you within fifteen (15) days via email
          and/or our Services notification system. We agree to the individual redress principle, giving
          individuals enforceable rights against data collectors and processors who fail to adhere to the law.
        </p>
      </Section>

      <Section title="Disclosure of personal information">
        <p>There are times when personal information you share with us may be shared with Partners (contractors, service providers, and third parties) to enable us to provide you Services. We ensure our Partners protect your personal information. We may:</p>
        <Bullets items={[
          "Disclose aggregated, de-personalized information that does not identify any individual;",
          "Disclose personal information to our subsidiaries and affiliates;",
          "Disclose personal information to contractors, service providers, and other third parties under confidentiality obligations;",
          "Disclose personal information to fulfill the purpose for which you provided it;",
          "Disclose personal information with your consent.",
        ]} />
        <p>
          We will also disclose personal information to comply with any court order, law, or legal process;
          to enforce our Terms &amp; Conditions; and where necessary to protect the rights, property, or
          safety of Oins Finance Group, our clients, or others. We do not sell, trade, or rent personal
          information to others unless we provide you with advance notice.
        </p>
      </Section>

      <Section title="Your choices and rights">
        <p>
          You can set your browser to refuse some or all browser cookies, though some parts of the Website
          may not function properly. You may opt out of targeted advertising and promotional email by
          adjusting your account preferences or emailing your opt-out request to <Mail />.
        </p>
        <p>
          You have the right to access, correct, delete, or object to the processing of your personal data.
          To exercise these rights, contact us at <Mail />. Personal data is retained only for as long as
          necessary to fulfill the purposes for which it was collected or to comply with legal obligations.
        </p>
      </Section>

      <Section title="Children under 13 (COPPA)">
        <p>
          Our Website and Services are not intended for use by children under the age of 13 and do not
          target them. If you are under 13, please do not access or use our Website, App, or Services. To
          learn more about our COPPA practices, contact us at <Mail />.
        </p>
      </Section>

      <Section title="Modifications & contact">
        <p>
          We will post any changes to this Privacy Policy on this page and, where appropriate, notify you by
          email. By continuing to use our Services, you are bound by any changes we make. To ask questions
          or comment about this Privacy Policy and our privacy practices, contact us:
        </p>
        <p>
          Email: <Mail /><br />
          Address: Oins Finance Group, 10837 Sanders Rd, Wise, Virginia
        </p>
      </Section>
    </LegalShell>
  );
}
