import { LegalShell, Section, SubHeading, Bullets, Mail } from "@/components/common/Legal";

export default function Cookies() {
  return (
    <LegalShell
      title="Cookie Policy"
      updated="June 2026"
      intro="This Cookie Policy describes the arrangements Oins Finance Group has in place to comply with its obligations under the GDPR and how we handle information collected on this Site."
    >
      <Section>
        <p>
          Oins Finance Group (also referred to as “we,” “us,” or “our”) is committed to ensuring the
          privacy and integrity of personal information entrusted to us. The purpose of this Cookie Policy
          is to describe the arrangements Oins Finance Group has in place to comply with its obligations
          under the General Data Protection Regulation (“GDPR”) and its commitment to maintain the privacy
          of every current, former and prospective customer and website user.
        </p>
      </Section>

      <Section title="Why we collect personal information">
        <p>
          We collect, process, and use personal information on our Site in order to offer you better
          products and services, further enhance our business processes to our clients' requirements, and
          help direct you to the most suitable information on our products and services.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>We may collect information about you when you use this Site or other services offered by Oins Finance Group in the following ways:</p>
        <Bullets items={[
          "Recording certain telephone calls and electronic messages between you and our employees, and storing those records to satisfy our legal and regulatory obligations or for business purposes;",
          "When you register for password-protected sections of our Site, we may ask for your name, address, country of residence, email, telephone number, account number, assets, income and financial situation to verify your identity and eligibility;",
          "When you revisit the Site, your device and browser may automatically disclose certain information (such as browser type and settings, IP address, cookies, activity logs, and geolocation data), some of which may constitute personal data.",
        ]} />
      </Section>

      <Section title="What is a cookie?">
        <p>
          Cookies are small files stored on your device to keep track of your visit to a website and your
          preferences as you move between pages, and sometimes to save settings between visits. They enable
          a website to recognize your device as you move around the site, so that - for example - you do not
          have to re-enter your password each time you move between pages. Cookies also enable developers to
          gather statistics about how often people visit certain areas of the website.
        </p>
      </Section>

      <Section title="Terminology">
        <SubHeading>First party cookies</SubHeading>
        <p>Cookies installed on your device by the organization running the website you are visiting.</p>
        <SubHeading>Third party cookies</SubHeading>
        <p>Cookies installed on your device via the website you are visiting by another organization - for example, a specialist website analytics company.</p>
        <SubHeading>Persistent cookies</SubHeading>
        <p>These remain on your device even after you close your browser, and are activated each time you visit the website that created them (e.g. to remember your login details).</p>
        <SubHeading>Session cookies</SubHeading>
        <p>Temporary cookies that enable the website to operate (e.g. moving from page to page without logging in again). They are deleted once you close your browser.</p>
      </Section>

      <Section title="Which cookies we use">
        <p>Our Site uses Session and Persistent cookies. We use Session cookies for analytical purposes and to maintain our website efficiently. We use Persistent cookies to:</p>
        <Bullets items={[
          "Recognize you as a unique user so you do not have to input login details multiple times when moving between pages or services;",
          "Collect and compile anonymous, aggregated information for statistical and evaluation purposes to help us understand how users use our Site and improve its structure.",
        ]} />
        <SubHeading>Google Analytics cookies</SubHeading>
        <p>Our Site also uses Google Analytics cookies that may collect: operating system and browser; visits (quantity and dates); timestamp and duration of the visit; request rate; and traffic source (geolocation and country).</p>
      </Section>

      <Section title="How we safeguard your personal information">
        <p>
          We restrict access to personal information about you to those employees, agents, or other parties
          who need to know that information to provide support or other services to you. We maintain
          physical, electronic, and procedural safeguards - including firewalls, individual passwords, and
          encryption and authentication technology. Our employees are bound by legal agreements with respect
          to their processing of personal data of clients.
        </p>
      </Section>

      <Section title="Deleting cookies & consent">
        <p>
          You may opt out of cookies (and the use of this website) at any time by deleting the cookies set
          by the Site via your browser settings (deleting cache, browsing history, and cookies).
        </p>
        <p>In view of the importance of data privacy, we will assume you:</p>
        <Bullets items={[
          "Agree to accept the cookies we use on our Site if you continue using our Site or do not disable or opt out of the cookies as described above;",
          "By continuing usage of this Site, give your consent to Oins Finance Group's processing of cookies and user data, including by using Google Analytics.",
        ]} />
        <p>For any questions about this Cookie Policy, contact us at <Mail />.</p>
      </Section>
    </LegalShell>
  );
}
