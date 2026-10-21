"use client";

import { LegalLink, LegalPageLayout, legal } from "@/components/experience/legal-page";
import { GetAppBlock } from "@/components/experience/get-app-block";

export default function SupportPage() {
  return (
    <LegalPageLayout eyebrow="Help" title="Support">
      <h2 className={legal.h2}>How can we help?</h2>

      <p className={legal.p}>
        Email{" "}
        <LegalLink href="mailto:support@hiiipower.app">support@hiiipower.app</LegalLink>{" "}
        for account help, safety reports, privacy requests, and general product
        questions.
      </p>

      <h3 className={legal.h3}>Get the app</h3>
      <p className={legal.p}>
        Android is live on Google Play. Invite-only. No invite yet, or on iPhone?
        Join the waitlist below.
      </p>
      <div className="mb-8">
        <GetAppBlock utmContent="support" />
      </div>

      <h3 className={legal.h3}>Safety &amp; reports</h3>
      <p className={legal.p}>
        If you report content or a user in the app, we aim to review and act
        within <strong className={legal.strong}>2–3 business days</strong>. You
        can also email the same address with details.
      </p>

      <h3 className={legal.h3}>Account &amp; data</h3>
      <ul className={legal.ul}>
        <li>
          <strong className={legal.strong}>Deactivate or delete your account:</strong>{" "}
          In the app, open{" "}
          <strong className={legal.strong}>
            Settings → Deactivate or Delete Account
          </strong>
          .
        </li>
        <li>
          <strong className={legal.strong}>Privacy questions / data requests:</strong>{" "}
          Email{" "}
          <LegalLink href="mailto:support@hiiipower.app">
            support@hiiipower.app
          </LegalLink>{" "}
          (see also our <LegalLink href="/privacy">Privacy Policy</LegalLink>).
        </li>
      </ul>

      <h3 className={legal.h3}>Legal</h3>
      <ul className={legal.ul}>
        <li>
          <LegalLink href="/tos">Terms of Service</LegalLink>
        </li>
        <li>
          <LegalLink href="/privacy">Privacy Policy</LegalLink>
        </li>
      </ul>

      <hr className={legal.hr} />

      <p className="text-sm text-white/50">
        <strong className={legal.strong}>Operator:</strong> HiiiPower
        <br />
        <strong className={legal.strong}>App:</strong> HiiiPower (
        <code className={legal.code}>com.hiiipower.social</code>)
        <br />
        <br />
        Google Play and the Google Play logo are trademarks of Google LLC.
      </p>
    </LegalPageLayout>
  );
}
