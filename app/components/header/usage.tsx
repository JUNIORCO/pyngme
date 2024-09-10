import { MAX_FREE_RUNS_PER_MONTH } from "@/trigger/constants";

type UsageProps = {
  totalUsage: null | number;
  stripeSetupSucceeded: unknown;
};

export default async function Usage({
  totalUsage,
  stripeSetupSucceeded,
}: UsageProps) {
  if (!totalUsage || typeof stripeSetupSucceeded !== 'string') {
    return null;
  }

  const hasReachedMaxFreeRuns =
    totalUsage >= MAX_FREE_RUNS_PER_MONTH && !stripeSetupSucceeded;

  return (
    <button
      type="button"
      className="btn btn-ghost no-animation pointer-events-none"
    >
      Usage
      <div className="badge badge-secondary">
        {`${totalUsage.toLocaleString()} run${totalUsage === 1 ? "" : "s"}`}
      </div>
      {hasReachedMaxFreeRuns && (
        <div className="badge badge-error">Max free runs.</div>
      )}
    </button>
  );
}
