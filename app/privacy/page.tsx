"use client";

import { LegalLink, LegalPageLayout, legal } from "@/components/experience/legal-page";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      meta="Effective date: September 28, 2026"
    >
      <p className={legal.meta}>
        <strong className={legal.strong}>Operator:</strong> HiiiPower
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        <br />
        <strong className={legal.strong}>Contact / privacy requests:</strong>{" "}
        <LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink>
        <br />
        <strong className={legal.strong}>Public URL:</strong>{" "}
        https://hiiipower.app/privacy
        <br />
        <strong className={legal.strong}>Related:</strong>{" "}
        <LegalLink href="/tos">Terms of Service</LegalLink>
      </p>

      <p className={legal.p}>
        This Privacy Policy explains what personal data we collect when you use
        the HiiiPower mobile app and related services (the &ldquo;Service&rdquo;),
        why we use it, how long we keep it, and the choices you have.
      </p>

      <h2 className={legal.h2}>1. Who we are</h2>
      <p className={legal.p}>
        HiiiPower operates a social application with optional privacy-preserving
        (encrypted) posts and identity checks intended to reduce fake accounts.
        For privacy questions or data requests, email{" "}
        <strong className={legal.strong}><LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink></strong>.
      </p>

      <h2 className={legal.h2}>2. Data we collect</h2>

      <h3 className={legal.h3}>2.1 Account and profile</h3>
      <ul className={legal.ul}>
        <li>Email address (via Privy authentication)</li>
        <li>
          Username, display name, bio, and other profile fields you provide
        </li>
        <li>Profile photos / banners you upload</li>
        <li>
          Account status (active, deactivated, pending deletion) and related
          timestamps
        </li>
      </ul>

      <h3 className={legal.h3}>2.2 Authentication and wallet identifiers</h3>
      <ul className={legal.ul}>
        <li>Privy user identifiers and linked email account metadata</li>
        <li>
          Embedded wallet address(es) created for your account (and, if
          applicable, smart-wallet addresses used for sponsored transactions)
        </li>
        <li>
          Authentication tokens / session credentials needed to keep you signed
          in
        </li>
      </ul>
      <p className={legal.p}>
        Sign-in is through Privy email one-time-passcode (OTP) only. We do not
        offer password-based login.
      </p>

      <h3 className={legal.h3}>2.3 Face data (TrueDepth camera / ARKit liveness check)</h3>
      <p className={legal.p}>
        This section describes all face data HiiiPower collects, how it is used,
        shared, stored, retained, and deleted.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.1 What we collect.</strong> During registration, on iPhones with a TrueDepth (Face ID) camera, HiiiPower runs a one-time face liveness and uniqueness check using Apple&apos;s TrueDepth camera and ARKit face tracking.
      </p>
      <ul className={legal.ul}>
        <li>
          <em>Processed on your device only, never transmitted or stored:</em> camera frames, face position and orientation, and facial expression values (such as eye blink, smile, and head turn) that ARKit provides through the TrueDepth camera. The app uses these only to confirm that a single, live person is present and completing a randomized on-screen challenge. They are discarded as soon as the check ends. We never upload or store photos, video, depth maps, or face-mesh geometry.
        </li>
        <li>
          <em>Sent to our servers:</em> a numeric face template (also called an embedding) that an on-device model computes from the captured frames. The template is encrypted on your device before it is sent. With it we receive the liveness score, a session identifier, and a one-way hash of your device identifier.
        </li>
        <li>
          <em>Created on our servers:</em> the check outcome (accept, review, or reject), a similarity score, a reference to the most similar existing account (if any), a one-way hash of the template, and the time of the check.
        </li>
      </ul>
      <p className={legal.p}>
        A face template is a string of numbers, not an image, and cannot be viewed as a photo.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.2 How we use face data.</strong> We use face data only to:
      </p>
      <ol className={legal.ul} style={{listStyleType: 'decimal'}}>
        <li>
          confirm that a real, live person is creating the account; and
        </li>
        <li>
          prevent duplicate and fraudulent accounts by comparing your template against the templates of existing HiiiPower accounts, so that each person can hold only one account.
        </li>
      </ol>
      <p className={legal.p}>
        We do <strong className={legal.strong}>not</strong> use face data for advertising, marketing, profiling, analytics, use-based data mining, or training machine-learning models. We do not use it to identify you to other users, and we do not use it to unlock the app or sign you in. We never sell face data.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.3 Sharing.</strong> We do <strong className={legal.strong}>not</strong> share, sell, rent, or disclose face data to any third party. Face data is not sent to Privy, advertising networks, analytics providers, or any other third-party service. It is handled only by HiiiPower&apos;s own systems, which run on the infrastructure providers listed in §2.3.4. Those providers host our systems on our behalf and may not use the data for their own purposes. Within HiiiPower, access is limited to authorized personnel who review flagged checks, and they see outcomes and scores only (no images exist). We will disclose face data only if the law requires it.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.4 Where face data is stored.</strong>
      </p>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>Database:</strong> HiiiPower&apos;s own database on MongoDB Atlas, hosted on Amazon Web Services in the Mumbai, India region (ap-south-1). The template is stored only in encrypted form.
        </li>
        <li>
          <strong className={legal.strong}>Application servers:</strong> our API servers on Render, hosted in the United States (Oregon). They decrypt the template in memory only to run the uniqueness comparison, and do not write it to disk or to logs.
        </li>
        <li>
          <strong className={legal.strong}>Operational logs:</strong> our server logs record the outcome and similarity score of each check, never the template. These logs roll off automatically within 30 days.
        </li>
      </ul>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.5 Security.</strong> Templates are protected in transit by TLS and by encryption on your device (RSA-OAEP with AES-256-GCM). At rest they are encrypted with AES-256-GCM using keys held on our application servers, separately from the database. The database provider also encrypts storage at rest.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.6 Retention.</strong> We keep your face template and related liveness records only while your account exists, because they are needed to keep preventing duplicate accounts. If a check is rejected as a duplicate, your template is not stored. We keep only the attempt record (outcome, score, and the matched-account reference), and it is deleted along with your account. Temporary check sessions expire automatically within minutes. We do not currently keep separate database backups that contain face data. If we add backups, encrypted backup copies will be overwritten within 30 days of deletion.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.7 Deletion.</strong> When you delete your account (<strong className={legal.strong}>Settings → Deactivate / Delete Account</strong>), your face template, template hash, liveness scores, and all liveness session and attempt records are permanently erased when the 30-day deletion grace period ends. Any reference to your account in other users&apos; liveness records is also removed. You can ask us to delete your face data at any time by emailing{" "}
        <strong className={legal.strong}><LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink></strong>. Deleting your face data this way also removes your verified status, and you may need to verify again to keep using features that require it.
      </p>

      <p className={legal.p}>
        <strong className={legal.strong}>2.3.8 Consent.</strong> The face check runs only after you choose to start it and grant camera permission. You can revoke camera permission at any time in iOS Settings.
      </p>

      <h3 className={legal.h3}>2.4 User-generated content</h3>
      <ul className={legal.ul}>
        <li>
          Posts, captions, comments, likes, and direct messages (plaintext and/or
          encrypted, depending on feature; comments are currently plaintext)
        </li>
        <li>
          Media you upload (stored on our servers and/or decentralized storage
          such as IPFS)
        </li>
        <li>
          Location labels you attach to posts (for example city / place), when
          you choose to share them
        </li>
      </ul>

      <h3 className={legal.h3}>2.5 Location</h3>
      <p className={legal.p}>
        If you grant permission, we may access approximate or precise location to
        help you select a city/country or discover nearby content. You can deny
        or revoke location permission in system settings.
      </p>

      <h3 className={legal.h3}>2.6 Device, push, and diagnostics</h3>
      <ul className={legal.ul}>
        <li>
          Device identifiers used for push notifications (e.g. Expo push tokens)
          and platform (iOS/Android)
        </li>
        <li>App version / basic device information needed for compatibility</li>
        <li>
          IP address and request metadata processed by our servers (security,
          rate limiting, abuse prevention)
        </li>
        <li>
          If we later enable a crash-reporting service, limited crash and
          diagnostic logs may be collected to improve reliability; we will update
          this Policy if that becomes material
        </li>
      </ul>

      <h3 className={legal.h3}>2.7 Social graph and safety</h3>
      <ul className={legal.ul}>
        <li>
          Outer Circle and Inner Circle relationships and access requests
        </li>
        <li>
          Blocks and reports you submit or that involve you (reason codes and
          optional details)
        </li>
        <li>Notifications related to social activity</li>
      </ul>

      <h3 className={legal.h3}>2.8 Progression / referrals</h3>
      <ul className={legal.ul}>
        <li>
          XP, levels, quests, streaks, medals / rewards metadata, and referral
          codes or slots tied to your account
        </li>
      </ul>

      <h3 className={legal.h3}>2.9 Optional platform connections</h3>
      <p className={legal.p}>
        If you connect third-party platforms for data-portability features
        (separate from sign-in), we may store connection status and data assets
        you choose to archive. Depending on the provider and how the connection
        works:
      </p>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>OAuth-based connections</strong> (for
          example Spotify or Google today) — encrypted access / refresh tokens,
          scopes, and derived or synced assets
        </li>
        <li>
          <strong className={legal.strong}>
            Archive / guided export connections
          </strong>{" "}
          (for example Meta family platforms today) — uploaded archive files or
          summaries you provide, plus connection status (not OAuth tokens)
        </li>
        <li>
          <strong className={legal.strong}>Additional providers</strong> we may
          add later — using similar OAuth and/or archive patterns, which we will
          describe in this Policy when material
        </li>
      </ul>

      <h2 className={legal.h2}>3. How we use data</h2>
      <p className={legal.p}>We use personal data to:</p>
      <ul className={legal.ul}>
        <li>Create and secure your account and sessions</li>
        <li>
          Provide core social features (profiles, posts, comments, messaging,
          notifications)
        </li>
        <li>
          Operate encrypted / access-controlled posts (including key wrapping and
          access checks)
        </li>
        <li>
          Run the face liveness / uniqueness check to prevent fraud and duplicate accounts (face data is used only as described in §2.3)
        </li>
        <li>Enforce safety (reports, blocks, bans) and respond to abuse</li>
        <li>
          Send transactional email (for example account lifecycle notices when an
          email is on file)
        </li>
        <li>Improve reliability, debug issues, and prevent spam / attacks</li>
        <li>Comply with law and App Store / platform requirements</li>
      </ul>
      <p className={legal.p}>
        We do <strong className={legal.strong}>not</strong> sell your personal
        data. We do not use your content for third-party advertising profiles.
      </p>

      <h2 className={legal.h2}>4. Legal bases (where applicable)</h2>
      <p className={legal.p}>
        Depending on your jurisdiction, we process data based on: contract (to
        provide the Service), consent (e.g. camera / location / the face liveness check), legitimate interests (security, abuse prevention,
        product improvement), and legal obligation.
      </p>

      <h2 className={legal.h2}>5. Sharing and processors</h2>
      <p className={legal.p}>
        <strong className={legal.strong}>Face data is never shared with third parties.</strong> See §2.3.3.
      </p>
      <p className={legal.p}>
        We share other data with service providers who process it on our instructions,
        which may include:
      </p>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>Privy</strong>: email OTP
          authentication and embedded wallets (receives no face data)
        </li>
        <li>
          <strong className={legal.strong}>Cloud hosting / database</strong> (Render for application servers; MongoDB Atlas on AWS for the database): API, realtime, and data storage
        </li>
        <li>
          <strong className={legal.strong}>Object storage</strong> (Cloudflare R2): uploaded media such as profile photos and post images (receives no face data)
        </li>
        <li>
          <strong className={legal.strong}>Email delivery</strong>:
          transactional messages
        </li>
        <li>
          <strong className={legal.strong}>Maps / geocoding providers</strong>{" "}
          (Apple Maps via the device, LocationIQ): location features
        </li>
        <li>
          <strong className={legal.strong}>IPFS pinning / gateways</strong> (e.g.
          Infura, Pinata, or another provider we configure): media and metadata
          storage for posts
        </li>
        <li>
          <strong className={legal.strong}>Push infrastructure</strong> (e.g. Expo
          / APNs): notifications
        </li>
      </ul>
      <p className={legal.p}>
        Encrypted / access-controlled posts use server-side key wrapping and
        access checks operated by us (not a separate third-party key network).
      </p>
      <p className={legal.p}>
        We may disclose information if required by law, to protect rights and
        safety, or in connection with a merger / acquisition (with notice where
        required).
      </p>
      <p className={legal.p}>
        Public or decentralized publications (IPFS CIDs, on-chain commitments)
        may be visible to anyone with the relevant identifier and are outside
        ordinary &ldquo;private database&rdquo; controls.
      </p>

      <h2 className={legal.h2}>6. International transfers</h2>
      <p className={legal.p}>
        Our database is hosted in India (AWS Mumbai region) and our application servers in the United States, so your data, including encrypted face templates, may be processed in countries other than your own. Where
        required, we use appropriate safeguards for cross-border transfers.
      </p>

      <h2 className={legal.h2}>7. Retention</h2>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>Active accounts:</strong> data retained
          while your account is open and as needed to operate the Service
        </li>
        <li>
          <strong className={legal.strong}>Deactivation:</strong> profile and posts
          may be hidden while account data is retained
        </li>
        <li>
          <strong className={legal.strong}>Deletion request:</strong> after you
          request deletion in-app, we schedule permanent erasure (currently a{" "}
          <strong className={legal.strong}>30-day grace period</strong> during
          which you may cancel by signing back in). After purge we delete account
          records, social graph rows, messages involving you, safety rows
          involving you, face templates and all liveness session/attempt records, local profile media
          files we host, and related progression data, as described in our
          account lifecycle process
        </li>
        <li>
          <strong className={legal.strong}>Face data:</strong> retained and deleted as described in §2.3.6 and §2.3.7. Deactivation or the deletion grace period hides your account but keeps your template until the purge completes. The template is then permanently erased
        </li>
        <li>
          <strong className={legal.strong}>Backups:</strong> may persist for a
          limited period (no more than 30 days) before rolling off
        </li>
        <li>
          <strong className={legal.strong}>Legal holds / abuse records:</strong>{" "}
          may be retained longer when necessary (this never includes face templates beyond the periods in §2.3)
        </li>
        <li>
          <strong className={legal.strong}>IPFS / blockchain:</strong> we may be
          unable to erase copies that already exist on public networks (face data is never published to IPFS or a blockchain)
        </li>
      </ul>

      <h2 className={legal.h2}>8. Your choices and rights</h2>
      <p className={legal.p}>
        Depending on your location, you may have rights to access, correct,
        delete, export, or restrict processing of your personal data, and to
        withdraw consent where processing is consent-based.
      </p>
      <p className={legal.p}>In-app controls:</p>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>
            Settings → Deactivate / Delete Account
          </strong>
          : start deletion (including face data)
        </li>
        <li>
          <strong className={legal.strong}>Settings → Blocked users</strong>:
          manage blocks
        </li>
        <li>
          <strong className={legal.strong}>Report</strong> controls on posts,
          profiles, comments, and chats
        </li>
        <li>
          System settings: revoke camera, photos, location, and
          notification permissions
        </li>
      </ul>
      <p className={legal.p}>
        You can also email{" "}
        <strong className={legal.strong}><LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink></strong>, including to request deletion of your face data only. We aim
        to respond within a reasonable period (and within 2–3 business days for
        safety reports where feasible).
      </p>

      <h2 className={legal.h2}>9. Children</h2>
      <p className={legal.p}>
        The Service is not directed to children under 13 (or higher age required
        locally). We do not knowingly collect personal data from children under
        that age. If you believe a child has registered, contact us and we will
        take appropriate steps.
      </p>

      <h2 className={legal.h2}>10. Security</h2>
      <p className={legal.p}>
        We use industry-standard measures including transport encryption
        (HTTPS/TLS), access-controlled APIs, and encryption for certain post
        content and for face templates (see §2.3.5). No method of transmission or storage is
        100% secure.
      </p>

      <h2 className={legal.h2}>11. App Store privacy labels</h2>
      <p className={legal.p}>
        We disclose data collection categories in Apple App Store Connect (and
        equivalent store listings) consistent with this Policy, including
        identifiers, contact info, user content, location (if enabled),
        diagnostics, and sensitive info related to the face liveness check.
      </p>

      <h2 className={legal.h2}>12. Changes</h2>
      <p className={legal.p}>
        We may update this Policy from time to time. We will update the effective
        date and, for material changes, provide additional notice where
        appropriate.
      </p>

      <h2 className={legal.h2}>13. Contact</h2>
      <p className={legal.p}>
        <strong className={legal.strong}><LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink></strong>
        <br />
        Website: https://hiiipower.app
      </p>
    </LegalPageLayout>
  );
}
