"use client";

import { LegalLink, LegalPageLayout, legal } from "@/components/experience/legal-page";

export default function TermsOfService() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      meta="Effective date: October 14, 2026"
    >
      <p className={legal.meta}>
        <strong className={legal.strong}>Operator:</strong> HiiiPower
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        <br />
        <strong className={legal.strong}>Contact:</strong> support@hiiipower.app
        <br />
        <strong className={legal.strong}>Public URL:</strong>{" "}
        https://hiiipower.app/tos
        <br />
        <strong className={legal.strong}>Child safety (anchor):</strong>{" "}
        https://hiiipower.app/tos#child-safety
      </p>

      <p className={legal.p}>
        These Terms govern your access to and use of the HiiiPower mobile
        application and related services (the &ldquo;Service&rdquo;). By creating
        an account or using the Service, you agree to these Terms and our{" "}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>.
      </p>

      <h2 id="eligibility" className={legal.h2}>1. Eligibility</h2>
      <p className={legal.p}>
        You must be at least 13 years old (or the minimum age required in your
        country) to use the Service. If you are under the age of majority where
        you live, you may only use the Service with a parent or guardian&apos;s
        consent. The Service is not directed to children under 13.
      </p>

      <h2 id="account-registration" className={legal.h2}>2. Account registration</h2>
      <ul className={legal.ul}>
        <li>
          Access is provided only through email one-time-passcode (OTP)
          authentication via our identity provider (Privy). We do not offer
          password-based login. You are responsible for keeping access to your
          email secure.
        </li>
        <li>
          You agree to provide accurate information during onboarding (including
          username and any profile details you choose to share) and to keep it up
          to date.
        </li>
        <li>
          You may not impersonate others, create accounts for abusive purposes, or
          attempt to circumvent bans, blocks, or safety systems.
        </li>
        <li>
          You may deactivate or delete your account in{" "}
          <strong className={legal.strong}>
            Settings → Deactivate / Delete Account
          </strong>
          . Deletion enters a grace period (currently 30 days) during which you
          may reactivate; after that, we permanently erase account data as
          described in the Privacy Policy, subject to legal and technical limits
          (for example content already published to decentralized storage or
          recorded on a public blockchain).
        </li>
      </ul>

      <h2 id="the-service" className={legal.h2}>3. The Service</h2>
      <p className={legal.p}>
        HiiiPower is a social application focused on authentic identity and
        privacy-aware posting. Features may include profiles, posts, comments,
        direct messages, notifications, quests / progression, referrals, and
        optional privacy-preserving (encrypted) posts.
      </p>
      <p className={legal.p}>
        We may change, suspend, or discontinue features at any time. We do not
        guarantee uninterrupted or error-free operation.
      </p>

      <h2 id="user-content" className={legal.h2}>4. User content</h2>
      <p className={legal.p}>
        You retain ownership of content you create and upload (&ldquo;User
        Content&rdquo;). By posting User Content, you grant us a worldwide,
        non-exclusive, royalty-free license to host, store, process, display, and
        transmit that content solely to operate and improve the Service
        (including encryption, access control, moderation, backup, and delivery).
      </p>
      <p className={legal.p}>
        You are solely responsible for your User Content and for ensuring you
        have the rights to post it. You must not post content that:
      </p>
      <ul className={legal.ul}>
        <li>
          Is illegal, fraudulent, or infringing of intellectual property or
          privacy rights
        </li>
        <li>
          Constitutes harassment, hate speech, threats, or incitement to violence
        </li>
        <li>
          Contains or promotes child sexual abuse or exploitation (CSAE),
          including child sexual abuse material (CSAM) —{" "}
          <strong className={legal.strong}>zero tolerance</strong> (see{" "}
          <LegalLink href="#child-safety">Child safety</LegalLink>)
        </li>
        <li>Is spam, malware, or designed to disrupt the Service</li>
        <li>
          Violates another person&apos;s rights of publicity or biometric privacy
          laws applicable to you
        </li>
      </ul>
      <p className={legal.p}>
        We may remove or restrict content, suspend accounts, or cooperate with
        lawful requests when we believe it is reasonably necessary to protect
        users, the Service, or to comply with law.
      </p>

      <h2 id="safety-tools" className={legal.h2}>5. Safety tools</h2>
      <p className={legal.p}>
        The Service provides in-app tools to{" "}
        <strong className={legal.strong}>report</strong> content or users and to{" "}
        <strong className={legal.strong}>block</strong> users. Reports are
        reviewed by our team; we aim to act on reports within 2–3 business days.
        You can also contact support@hiiipower.app.
      </p>
      <p className={legal.p}>
        Blocking hides mutual visibility in feeds, profiles, comments, and
        messaging to the extent technically feasible.
      </p>

      <h2 id="child-safety" className={legal.h2}>6. Child safety</h2>
      <p className={legal.p}>
        HiiiPower prohibits child sexual abuse and exploitation (
        <strong className={legal.strong}>CSAE</strong>) on the Service. This
        includes, without limitation, grooming, sextortion, trafficking of a child
        for sex, sexual abuse or exploitation of a minor, and child sexual abuse
        material (<strong className={legal.strong}>CSAM</strong>) — any visual
        depiction (photos, videos, or computer-generated imagery) of a minor
        engaged in sexually explicit conduct.
      </p>
      <p className={legal.p}>
        <strong className={legal.strong}>
          These standards apply to the HiiiPower app and related services operated
          by HiiiPower.
        </strong>
      </p>

      <h3 id="what-we-prohibit" className={legal.h3}>What we prohibit</h3>
      <ul className={legal.ul}>
        <li>
          Creating, uploading, sharing, soliciting, or linking to CSAM or other
          CSAE content or behavior
        </li>
        <li>Using the Service to contact, groom, or exploit minors</li>
        <li>
          Attempting to circumvent age gates, bans, blocks, or safety systems in
          connection with the above
        </li>
      </ul>

      <h3 id="how-to-report" className={legal.h3}>How to report</h3>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>In-app:</strong> use{" "}
          <strong className={legal.strong}>Report</strong> on a post, profile, or
          conversation, and/or <strong className={legal.strong}>Block</strong> a
          user
        </li>
        <li>
          <strong className={legal.strong}>Email:</strong> support@hiiipower.app
          with &ldquo;Child safety&rdquo; or &ldquo;CSAM&rdquo; in the subject
          line when possible
        </li>
      </ul>
      <p className={legal.p}>
        We aim to review safety reports within{" "}
        <strong className={legal.strong}>2–3 business days</strong>, and faster
        when a report indicates imminent harm or CSAM.
      </p>

      <h3 id="what-we-do" className={legal.h3}>
        What we do when we learn of CSAM / CSAE
      </h3>
      <p className={legal.p}>
        When we obtain <strong className={legal.strong}>actual knowledge</strong>{" "}
        of CSAM or other CSAE on the Service, we take appropriate action
        consistent with these Terms and applicable law, including as warranted:
      </p>
      <ol className={legal.ul} style={{ listStyleType: "decimal" }}>
        <li>
          Removing or restricting access to the content as quickly as practicable
        </li>
        <li>Suspending or terminating the responsible account(s)</li>
        <li>
          Preserving relevant records as required for legal compliance and
          investigations
        </li>
        <li>
          Reporting <strong className={legal.strong}>confirmed CSAM</strong> to
          the{" "}
          <LegalLink
            href="https://www.missingkids.org/gethelpnow/cybertipline"
            external
          >
            National Center for Missing & Exploited Children (NCMEC) CyberTipline
          </LegalLink>{" "}
          and/or the relevant regional authority, as required by applicable law
        </li>
        <li>Cooperating with lawful requests from law enforcement</li>
      </ol>
      <p className={legal.p}>
        Technical limits may apply to content already published to decentralized
        storage or recorded on a public blockchain (see section 10); we still
        remove or restrict access on systems we control and take the enforcement
        steps above.
      </p>

      <h3 id="child-safety-contact" className={legal.h3}>
        Child safety point of contact
      </h3>
      <p className={legal.p}>
        For CSAE / CSAM notices (including notifications from Google Play or other
        platforms):
      </p>
      <p className={legal.p}>
        <strong className={legal.strong}>Email:</strong> support@hiiipower.app
        <br />
        <strong className={legal.strong}>Subject line:</strong> Child safety /
        CSAM
      </p>
      <p className={legal.p}>
        A designated member of our team monitors this inbox and can speak to our
        enforcement and review procedures and take action when required.
      </p>

      <h3 id="legal-compliance" className={legal.h3}>Legal compliance</h3>
      <p className={legal.p}>
        We aim to comply with applicable child-safety laws and regulations in the
        jurisdictions where we operate the Service, including obligations related
        to CSAM reporting where they apply.
      </p>

      <h2 id="identity-verification" className={legal.h2}>
        7. Identity verification (liveness)
      </h2>
      <p className={legal.p}>
        To reduce fake accounts and protect the community, we may require a
        one-time facial liveness / uniqueness check during registration. Camera
        frames are processed on your device to derive a biometric template (face
        embedding); we do <strong className={legal.strong}>not</strong> upload
        face images or video. The template and related decision metadata are used
        to verify liveness and help prevent duplicate registrations. Templates are
        treated as sensitive personal data and are not used for advertising; see
        the Privacy Policy for retention and deletion details.
      </p>
      <p className={legal.p}>
        You must only submit your own face. Attempting to spoof, use another
        person&apos;s biometric data, or otherwise defeat the check is prohibited.
      </p>

      <h2 id="acceptable-use" className={legal.h2}>8. Acceptable use</h2>
      <p className={legal.p}>You agree not to:</p>
      <ul className={legal.ul}>
        <li>
          Scrape, reverse engineer, or overload the Service except as allowed by
          applicable law
        </li>
        <li>
          Probe or attack our systems, other users&apos; accounts, or encryption
          mechanisms
        </li>
        <li>
          Use the Service for commercial spam, unauthorized advertising, or bulk
          messaging abuse
        </li>
        <li>Circumvent access controls on private or encrypted posts</li>
      </ul>

      <h2 id="third-party-services" className={legal.h2}>
        9. Third-party services
      </h2>
      <p className={legal.p}>
        The Service relies on third parties such as Privy (authentication /
        wallets), cloud hosting and databases, email delivery, maps / location
        providers, IPFS pinning providers, and push notification infrastructure.
        Their terms may also apply when you use features that depend on them.
      </p>

      <h2 id="decentralized-artifacts" className={legal.h2}>
        10. Decentralized and on-chain artifacts
      </h2>
      <p className={legal.p}>
        Some features may store encrypted or public media on IPFS or record
        commitments / credentials on public blockchains. Content placed on
        decentralized networks or blockchains may be{" "}
        <strong className={legal.strong}>
          immutable or beyond our practical ability to delete
        </strong>
        . By using those features you acknowledge this limitation.
      </p>

      <h2 id="intellectual-property" className={legal.h2}>
        11. Intellectual property
      </h2>
      <p className={legal.p}>
        The HiiiPower name, branding, app UI, and our non-user software are our
        property or that of our licensors. You may not use our marks without
        prior written permission.
      </p>

      <h2 id="disclaimers" className={legal.h2}>12. Disclaimers</h2>
      <p className={legal.upper}>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, express or implied, including
        merchantability, fitness for a particular purpose, and non-infringement,
        to the maximum extent permitted by law. We do not warrant that User
        Content is accurate, safe, or available forever.
      </p>

      <h2 id="limitation-of-liability" className={legal.h2}>
        13. Limitation of liability
      </h2>
      <p className={legal.upper}>
        To the maximum extent permitted by law, HiiiPower and its operators will
        not be liable for indirect, incidental, special, consequential, or
        punitive damages, or for lost profits, data, or goodwill, arising from
        your use of the Service. Our aggregate liability for claims relating to
        the Service will not exceed the greater of (A) amounts you paid us in the
        12 months before the claim or (B) USD $50.
      </p>
      <p className={legal.p}>
        Some jurisdictions do not allow certain limitations; in those places, our
        liability is limited to the fullest extent allowed.
      </p>

      <h2 id="indemnity" className={legal.h2}>14. Indemnity</h2>
      <p className={legal.p}>
        You agree to indemnify and hold harmless HiiiPower from claims arising
        out of your User Content, your misuse of the Service, or your violation
        of these Terms or applicable law.
      </p>

      <h2 id="termination" className={legal.h2}>15. Termination</h2>
      <p className={legal.p}>
        We may suspend or terminate access if you violate these Terms, create
        risk for other users, or if required by law. You may stop using the
        Service and delete your account at any time as described above.
      </p>

      <h2 id="changes" className={legal.h2}>16. Changes</h2>
      <p className={legal.p}>
        We may update these Terms. Material changes will be reflected by updating
        the effective date and, where appropriate, in-app notice. Continued use
        after changes become effective constitutes acceptance.
      </p>

      <h2 id="governing-law" className={legal.h2}>17. Governing law</h2>
      <p className={legal.p}>
        These Terms are governed by the laws applicable in the jurisdiction where
        the operator is established, without regard to conflict-of-law rules,
        except where mandatory consumer protections in your country apply.
      </p>

      <h2 id="contact" className={legal.h2}>18. Contact</h2>
      <p className={legal.p}>
        Questions about these Terms:{" "}
        <strong className={legal.strong}>support@hiiipower.app</strong>
        <br />
        Child safety / CSAM:{" "}
        <strong className={legal.strong}>support@hiiipower.app</strong> (subject:
        Child safety / CSAM)
      </p>

      <hr className={legal.hr} />

      <p className={legal.p} style={{ fontStyle: "italic" }}>
        This document is a practical baseline for App Store / product launch. Have
        counsel review before relying on it as final legal advice — especially the
        child-safety / CSAM reporting section.
      </p>
    </LegalPageLayout>
  );
}
