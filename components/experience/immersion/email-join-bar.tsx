"use client";

import { EmailJoinForm } from "@/components/experience/email-join-form";

type EmailJoinBarProps = {
  visible: boolean;
};

/** Zero-style bottom email capture — white bar, “enter your email”, join CTA. */
export function EmailJoinBar({ visible }: EmailJoinBarProps) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[45] flex justify-center px-4 pb-7 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <EmailJoinForm />
    </div>
  );
}
