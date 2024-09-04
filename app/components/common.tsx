export const PageContentContainer = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 px-4 md:px-32 py-8 flex flex-col gap-12">
      {children}
    </div>
  );
};

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};
