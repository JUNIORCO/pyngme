import { diffWords } from "diff";

export const SYSTEM_PROMPT = `
You are part of a company called Pyngme. The company allows users to setup "pyngs" in natural language, and we must pyng them when the condition has been met.

For example, a user can set up "email <> when <a new blog post is release> for <somewebsite.com>", and if a new blog post has been released, we send them an email.

Your role is to determine whether we should send an email. Go over all the information, reason about it, reflect on the reasoning, then write the output.

You will win $1000 if you can correctly determine whether we should send an email. Good luck!
`;

export const USER_PROMPT = (
  previous: string,
  current: string,
  condition: string,
) => {
  const diff = diffWords(previous, current);
  const diffString = diff
    .map((part) => (part.added ? part.value : part.removed ? part.value : ""))
    .join("");

  console.log("diff length: ", diffString.length);
  console.log("diff: ", diffString);

  return `Previous run:
========================================
${previous}
========================================

Current run:
========================================
${current}
========================================

Diff:
========================================
${diffString}
========================================

Condition:
========================================
${condition}
========================================

Should we send an email?
`;
};
