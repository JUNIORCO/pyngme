import Routes from "@/routes";

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <p className="text-3xl font-bold">Welcome to Pyngme!</p>
      <img
        src="/minions-excited.gif"
        alt="Welcome"
        className="rounded-lg w-[40%]"
      />
      <a href={Routes.hub}>
        <button type="button" className="btn btn-lg btn-accent btn-wide">
          Back to hub
        </button>
      </a>
    </div>
  );
}
