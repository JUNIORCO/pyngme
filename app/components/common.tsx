import type { ComponentProps } from "react";

export const PageContentContainer = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 px-4 md:px-32 py-8 flex flex-col gap-12">
      {children}
    </div>
  );
};

export const Title = ({
  className,
  children,
}: {
  className?: ComponentProps<"h1">["className"];
  children: React.ReactNode;
}) => {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
};
