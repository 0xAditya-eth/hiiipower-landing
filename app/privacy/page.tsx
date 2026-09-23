"use client";

import { LegalLink, LegalPageLayout, legal } from "@/components/experience/legal-page";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      meta="Effective date: August 12, 2026"
    >
      <p className={legal.meta}>
        <strong className={legal.strong}>Operator:</strong> HiiiPower
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        <br />
        <strong className={legal.strong}>Contact / privacy requests:</strong>{" "}
        support@hiiipower.app
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
        <strong className={legal.strong}>support@hiiipower.app</strong>.
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

      <h3 className={legal.h3}>2.3 Biometric / liveness data (sensitive)</h3>
      <p className={legal.p}>
        During registration we may run a facial liveness / uniqueness check.
        Camera frames used for the check are processed on your device and are{" "}
        <strong className={legal.strong}>not</strong> uploaded as images or
        video. What we receive and may store includes:
      </p>
      <ul className={legal.ul}>
        <li>Device / session metadata for the check</li>
        <li>
          A derived face embedding / template (and encrypted forms of that
          template)
        </li>
        <li>
          Scores and decision metadata (e.g. accept / review / reject), device
          hashes, and similarity match references used for anti-abuse
        </li>
      </ul>
      <p className={legal.p}>
        We use this data only to verify that a real person is registering and to
        reduce duplicate or fraudulent accounts. We do{" "}
        <strong className={legal.strong}>not</strong> sell biometric data, and we
        do <strong className={legal.strong}>not</strong> use biometric templates
        for advertising or third-party advertising profiles. Templates are
        treated as sensitive personal information.
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
        <li>Run liveness / uniqueness checks for fraud prevention</li>
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
        provide the Service), consent (e.g. camera / location / biometric check
        where required), legitimate interests (security, abuse prevention,
        product improvement), and legal obligation.
      </p>

      <h2 className={legal.h2}>5. Sharing and processors</h2>
      <p className={legal.p}>
        We share data with service providers who process it on our instructions,
        which may include:
      </p>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>Privy</strong> — email OTP
          authentication and embedded wallets
        </li>
        <li>
          <strong className={legal.strong}>Cloud hosting / database</strong> — API,
          realtime, and data storage
        </li>
        <li>
          <strong className={legal.strong}>Email delivery</strong> —
          transactional messages
        </li>
        <li>
          <strong className={legal.strong}>Maps / geocoding providers</strong>{" "}
          (Apple Maps via the device, LocationIQ) — location features
        </li>
        <li>
          <strong className={legal.strong}>IPFS pinning / gateways</strong> (e.g.
          Infura, Pinata, or another provider we configure) — media and metadata
          storage for posts
        </li>
        <li>
          <strong className={legal.strong}>Push infrastructure</strong> (e.g. Expo
          / APNs) — notifications
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
        Servers and processors may be located outside your country. Where
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
          involving you, liveness session/attempt records, local profile media
          files we host, and related progression data, as described in our
          account lifecycle process
        </li>
        <li>
          <strong className={legal.strong}>Biometric templates:</strong> retained
          only for anti-abuse / uniqueness purposes while the account exists (or
          until purge after a deletion request). Soft-hide (deactivation or the
          deletion grace period) clears push tokens and hides content but may
          retain templates until purge completes. Templates are deleted with the
          account purge and are not used for advertising
        </li>
        <li>
          <strong className={legal.strong}>Backups:</strong> may persist for a
          limited period before rolling off
        </li>
        <li>
          <strong className={legal.strong}>Legal holds / abuse records:</strong>{" "}
          may be retained longer when necessary
        </li>
        <li>
          <strong className={legal.strong}>IPFS / blockchain:</strong> we may be
          unable to erase copies that already exist on public networks
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
          </strong>{" "}
          — start deletion
        </li>
        <li>
          <strong className={legal.strong}>Settings → Blocked users</strong> —
          manage blocks
        </li>
        <li>
          <strong className={legal.strong}>Report</strong> controls on posts,
          profiles, comments, and chats
        </li>
        <li>
          System settings — revoke camera, microphone, photos, location, and
          notification permissions
        </li>
      </ul>
      <p className={legal.p}>
        You can also email{" "}
        <strong className={legal.strong}>support@hiiipower.app</strong>. We aim
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
        content and biometric templates. No method of transmission or storage is
        100% secure.
      </p>

      <h2 className={legal.h2}>11. App Store privacy labels</h2>
      <p className={legal.p}>
        We disclose data collection categories in Apple App Store Connect (and
        equivalent store listings) consistent with this Policy, including
        identifiers, contact info, user content, location (if enabled),
        diagnostics, and sensitive info related to liveness checks.
      </p>

      <h2 className={legal.h2}>12. Changes</h2>
      <p className={legal.p}>
        We may update this Policy from time to time. We will update the effective
        date and, for material changes, provide additional notice where
        appropriate.
      </p>

      <h2 className={legal.h2}>13. Contact</h2>
      <p className={legal.p}>
        <strong className={legal.strong}>support@hiiipower.app</strong>
        <br />
        Website: https://hiiipower.app
      </p>
    </LegalPageLayout>
  );
}
