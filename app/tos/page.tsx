"use client";

import { LegalLink, LegalPageLayout, legal } from "@/components/experience/legal-page";

export default function TermsOfService() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      meta="Effective date: August 12, 2026"
    >
      <p className={legal.meta}>
        <strong className={legal.strong}>Operator:</strong> HiiiPower
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        <br />
        <strong className={legal.strong}>Contact:</strong> support@hiiipower.app
        <br />
        <strong className={legal.strong}>Public URL:</strong>{" "}
        https://hiiipower.app/tos
      </p>

      <p className={legal.p}>
        These Terms govern your access to and use of the HiiiPower mobile
        application and related services (the &ldquo;Service&rdquo;). By creating
        an account or using the Service, you agree to these Terms and our{" "}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>.
      </p>

      <h2 className={legal.h2}>1. Eligibility</h2>
      <p className={legal.p}>
        You must be at least 13 years old (or the minimum age required in your
        country) to use the Service. If you are under the age of majority where
        you live, you may only use the Service with a parent or guardian&apos;s
        consent.
      </p>

      <h2 className={legal.h2}>2. Account registration</h2>
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

      <h2 className={legal.h2}>3. The Service</h2>
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

      <h2 className={legal.h2}>4. User content</h2>
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
          Contains child sexual exploitation or abuse material (zero tolerance)
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

      <h2 className={legal.h2}>5. Safety tools</h2>
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

      <h2 className={legal.h2}>6. Identity verification (liveness)</h2>
      <p className={legal.p}>
        To reduce fake accounts and protect the community, we may require a
        one-time facial liveness / uniqueness check during registration. Camera
        frames are processed on your device to derive a biometric template (face
        embedding); we do <strong className={legal.strong}>not</strong> upload
        face images or video. The template and related decision metadata are used
        to verify liveness and help prevent duplicate registrations. Templates
        are treated as sensitive personal data and are not used for advertising;
        see the Privacy Policy for retention and deletion details.
      </p>
      <p className={legal.p}>
        You must only submit your own face. Attempting to spoof, use another
        person&apos;s biometric data, or otherwise defeat the check is
        prohibited.
      </p>

      <h2 className={legal.h2}>7. Acceptable use</h2>
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

      <h2 className={legal.h2}>8. Third-party services</h2>
      <p className={legal.p}>
        The Service relies on third parties such as Privy (authentication /
        wallets), cloud hosting and databases, email delivery, maps / location
        providers, IPFS pinning providers, and push notification infrastructure.
        Their terms may also apply when you use features that depend on them.
      </p>

      <h2 className={legal.h2}>9. Decentralized and on-chain artifacts</h2>
      <p className={legal.p}>
        Some features may store encrypted or public media on IPFS or record
        commitments / credentials on public blockchains. Content placed on
        decentralized networks or blockchains may be{" "}
        <strong className={legal.strong}>
          immutable or beyond our practical ability to delete
        </strong>
        . By using those features you acknowledge this limitation.
      </p>

      <h2 className={legal.h2}>10. Intellectual property</h2>
      <p className={legal.p}>
        The HiiiPower name, branding, app UI, and our non-user software are our
        property or that of our licensors. You may not use our marks without
        prior written permission.
      </p>

      <h2 className={legal.h2}>11. Disclaimers</h2>
      <p className={legal.upper}>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, express or implied, including
        merchantability, fitness for a particular purpose, and non-infringement,
        to the maximum extent permitted by law. We do not warrant that User
        Content is accurate, safe, or available forever.
      </p>

      <h2 className={legal.h2}>12. Limitation of liability</h2>
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

      <h2 className={legal.h2}>13. Indemnity</h2>
      <p className={legal.p}>
        You agree to indemnify and hold harmless HiiiPower from claims arising
        out of your User Content, your misuse of the Service, or your violation
        of these Terms or applicable law.
      </p>

      <h2 className={legal.h2}>14. Termination</h2>
      <p className={legal.p}>
        We may suspend or terminate access if you violate these Terms, create
        risk for other users, or if required by law. You may stop using the
        Service and delete your account at any time as described above.
      </p>

      <h2 className={legal.h2}>15. Changes</h2>
      <p className={legal.p}>
        We may update these Terms. Material changes will be reflected by updating
        the effective date and, where appropriate, in-app notice. Continued use
        after changes become effective constitutes acceptance.
      </p>

      <h2 className={legal.h2}>16. Governing law</h2>
      <p className={legal.p}>
        These Terms are governed by the laws applicable in the jurisdiction where
        the operator is established, without regard to conflict-of-law rules,
        except where mandatory consumer protections in your country apply.
      </p>

      <h2 className={legal.h2}>17. Contact</h2>
      <p className={legal.p}>
        Questions about these Terms:{" "}
        <strong className={legal.strong}>support@hiiipower.app</strong>
      </p>
    </LegalPageLayout>
  );
}
