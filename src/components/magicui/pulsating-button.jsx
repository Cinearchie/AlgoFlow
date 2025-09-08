import React from "react";
import Link from "next/link";

export const PulsatingButton = React.forwardRef((
  { className, children, pulseColor = "#90cdf4", duration = "1.5s", href, ...props },
  ref,
) => {
  const pulseDiv = (
    <div
      className="absolute inset-0 animate-pulse rounded-lg bg-blue-500 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );

  const baseStyle = {
    padding: '5px 15px', // Adjust this for size
    fontSize: '20px',    // Adjust this for text size
    // Other styles...
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref}
        className={`relative inline-flex h-auto min-w-[fit-content] cursor-pointer items-center justify-center rounded-lg bg-primary text-primary-foreground ${className || ''}`}
        style={{ ...baseStyle, "--pulse-color": pulseColor, "--duration": duration }}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        {pulseDiv}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={`relative inline-flex h-auto min-w-[fit-content] cursor-pointer items-center justify-center rounded-lg bg-primary text-primary-foreground ${className || ''}`}
      style={{ ...baseStyle, "--pulse-color": pulseColor, "--duration": duration }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {pulseDiv}
    </button>
  );
});

PulsatingButton.displayName = "PulsatingButton";