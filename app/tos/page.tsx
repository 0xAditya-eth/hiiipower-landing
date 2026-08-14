"use client";

import React from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function TermsOfService() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => setModalOpen(true)} />

      <main className="relative z-10 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-zinc-500 mb-8">
              Effective date: August 5, 2026
            </p>

            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed mb-6">
                <strong>Operator:</strong> HiiiPower Technologies Private Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)<br />
                <strong>Contact:</strong> support@hiiipower.app<br />
                <strong>Public URL:</strong> https://hiiipower.app/tos
              </p>

              <p className="text-zinc-700 leading-relaxed mb-6">
                These Terms govern your access to and use of the HiiiPower mobile application and related services (the &ldquo;Service&rdquo;). By creating an account or using the Service, you agree to these Terms and our{" "}
                <a href="/privacy" className="text-zinc-900 underline hover:text-zinc-700 transition-colors">
                  Privacy Policy
                </a>.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                1. Eligibility
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                You must be at least 13 years old (or the minimum age required in your country) to use the Service. If you are under the age of majority where you live, you may only use the Service with a parent or guardian&apos;s consent.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                2. Account registration
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 leading-relaxed mb-6">
                <li>Access is provided only through email one-time-passcode (OTP) authentication via our identity provider (Privy). We do not offer password-based login. You are responsible for keeping access to your email secure.</li>
                <li>You agree to provide accurate information during onboarding (including username and any profile details you choose to share) and to keep it up to date.</li>
                <li>You may not impersonate others, create accounts for abusive purposes, or attempt to circumvent bans, blocks, or safety systems.</li>
                <li>You may deactivate or delete your account in <strong>Settings → Deactivate / Delete Account</strong>. Deletion enters a grace period (currently 30 days) during which you may reactivate; after that, we permanently erase account data as described in the Privacy Policy, subject to legal and technical limits (for example content already published to decentralized storage or recorded on a public blockchain).</li>
              </ul>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                3. The Service
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4">
                HiiiPower is a social application focused on authentic identity and privacy-aware posting. Features may include profiles, posts, comments, direct messages, notifications, quests / progression, referrals, and optional privacy-preserving (encrypted) posts.
              </p>
              <p className="text-zinc-700 leading-relaxed mb-6">
                We may change, suspend, or discontinue features at any time. We do not guarantee uninterrupted or error-free operation.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                4. User content
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4">
                You retain ownership of content you create and upload (&ldquo;User Content&rdquo;). By posting User Content, you grant us a worldwide, non-exclusive, royalty-free license to host, store, process, display, and transmit that content solely to operate and improve the Service (including encryption, access control, moderation, backup, and delivery).
              </p>
              <p className="text-zinc-700 leading-relaxed mb-4">
                You are solely responsible for your User Content and for ensuring you have the rights to post it. You must not post content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 leading-relaxed mb-6">
                <li>Is illegal, fraudulent, or infringing of intellectual property or privacy rights</li>
                <li>Constitutes harassment, hate speech, threats, or incitement to violence</li>
                <li>Contains child sexual exploitation or abuse material (zero tolerance)</li>
                <li>Is spam, malware, or designed to disrupt the Service</li>
                <li>Violates another person&apos;s rights of publicity or biometric privacy laws applicable to you</li>
              </ul>
              <p className="text-zinc-700 leading-relaxed mb-6">
                We may remove or restrict content, suspend accounts, or cooperate with lawful requests when we believe it is reasonably necessary to protect users, the Service, or to comply with law.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                5. Safety tools
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4">
                The Service provides in-app tools to <strong>report</strong> content or users and to <strong>block</strong> users. Reports are reviewed by our team; we aim to act on reports within 24 hours. You can also contact support@hiiipower.app.
              </p>
              <p className="text-zinc-700 leading-relaxed mb-6">
                Blocking hides mutual visibility in feeds, profiles, comments, and messaging to the extent technically feasible.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                6. Identity verification (liveness)
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4">
                To reduce fake accounts and protect the community, we may require a one-time facial liveness / uniqueness check during registration. Camera frames are processed on your device to derive a biometric template (face embedding); we do <strong>not</strong> upload face images or video. The template and related decision metadata are used to verify liveness and help prevent duplicate registrations. Templates are treated as sensitive personal data and are not used for advertising; see the Privacy Policy for retention and deletion details.
              </p>
              <p className="text-zinc-700 leading-relaxed mb-6">
                You must only submit your own face. Attempting to spoof, use another person&apos;s biometric data, or otherwise defeat the check is prohibited.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                7. Acceptable use
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 leading-relaxed mb-6">
                <li>Scrape, reverse engineer, or overload the Service except as allowed by applicable law</li>
                <li>Probe or attack our systems, other users&apos; accounts, or encryption mechanisms</li>
                <li>Use the Service for commercial spam, unauthorized advertising, or bulk messaging abuse</li>
                <li>Circumvent access controls on private or encrypted posts</li>
              </ul>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                8. Third-party services
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                The Service relies on third parties such as Privy (authentication / wallets), cloud hosting and databases, email delivery, maps / location providers, IPFS pinning providers, and push notification infrastructure. Their terms may also apply when you use features that depend on them.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                9. Decentralized and on-chain artifacts
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                Some features may store encrypted or public media on IPFS or record commitments / credentials on public blockchains. Content placed on decentralized networks or blockchains may be <strong>immutable or beyond our practical ability to delete</strong>. By using those features you acknowledge this limitation.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                10. Intellectual property
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                The HiiiPower name, branding, app UI, and our non-user software are our property or that of our licensors. You may not use our marks without prior written permission.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                11. Disclaimers
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6 uppercase text-sm">
                The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law. We do not warrant that User Content is accurate, safe, or available forever.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                12. Limitation of liability
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-4 uppercase text-sm">
                To the maximum extent permitted by law, HiiiPower and its operators will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, or goodwill, arising from your use of the Service. Our aggregate liability for claims relating to the Service will not exceed the greater of (A) amounts you paid us in the 12 months before the claim or (B) USD $50.
              </p>
              <p className="text-zinc-700 leading-relaxed mb-6">
                Some jurisdictions do not allow certain limitations; in those places, our liability is limited to the fullest extent allowed.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                13. Indemnity
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                You agree to indemnify and hold harmless HiiiPower from claims arising out of your User Content, your misuse of the Service, or your violation of these Terms or applicable law.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                14. Termination
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                We may suspend or terminate access if you violate these Terms, create risk for other users, or if required by law. You may stop using the Service and delete your account at any time as described above.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                15. Changes
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                We may update these Terms. Material changes will be reflected by updating the effective date and, where appropriate, in-app notice. Continued use after changes become effective constitutes acceptance.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                16. Governing law
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                These Terms are governed by the laws applicable in the jurisdiction where the operator is established, without regard to conflict-of-law rules, except where mandatory consumer protections in your country apply.
              </p>

              <h2 className="text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                17. Contact
              </h2>
              <p className="text-zinc-700 leading-relaxed mb-6">
                Questions about these Terms: <strong>support@hiiipower.app</strong>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
