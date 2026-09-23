"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

/** Shared cinema ease — matches Immersion / Opening */
export const cinemaEase = [0.22, 1, 0.36, 1] as const;

export const cinemaViewport = { once: true, margin: "-60px 0px" as const };

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds */
  delay?: number;
  /** Extra y travel (default 28) */
  y?: number;
  /** Start slightly blurred like Immersion chapter fades */
  blur?: boolean;
  /** Subtle scale-in */
  scale?: boolean;
  /** Use whileInView instead of mount animate */
  inView?: boolean;
  as?: "div" | "section" | "li" | "p" | "h1" | "h2" | "h3" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = false,
  scale = false,
  inView = true,
  as = "div",
  ...rest
}: RevealProps) {
  const Comp = motion[as] as typeof motion.div;

  const initial = {
    opacity: 0,
    y,
    ...(blur ? { filter: "blur(10px)" } : {}),
    ...(scale ? { scale: 0.94 } : {}),
  };
  const target = {
    opacity: 1,
    y: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    ...(scale ? { scale: 1 } : {}),
  };
  const transition = {
    duration: 0.7,
    delay,
    ease: cinemaEase,
  };

  if (inView) {
    return (
      <Comp
        className={className}
        initial={initial}
        whileInView={target}
        viewport={cinemaViewport}
        transition={transition}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      initial={initial}
      animate={target}
      transition={transition}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Stagger container — children should use `variants={staggerItem}` */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: cinemaEase,
    },
  },
};

export const staggerItemSoft: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cinemaEase,
    },
  },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  inView?: boolean;
  soft?: boolean;
  stagger?: number;
  delay?: number;
};

export function Stagger({
  children,
  className,
  inView = true,
  soft = false,
  stagger = 0.09,
  delay = 0.04,
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (inView) {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={cinemaViewport}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <motion.div variants={soft ? staggerItemSoft : staggerItem}>
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={soft ? staggerItemSoft : staggerItem}>
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}

/** Hero cascade: staggered blur/y entrances. Pass titleIndex for which child is the display headline. */
export function HeroCascade({
  children,
  className,
  titleIndex = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Which child gets the stronger title motion (default 0) */
  titleIndex?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.11, delayChildren: 0.06 },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        const isTitle = i === titleIndex;
        return (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: isTitle ? 40 : 20,
                filter: "blur(12px)",
                scale: isTitle ? 0.96 : 1,
              },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: {
                  duration: isTitle ? 0.85 : 0.65,
                  ease: cinemaEase,
                },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
