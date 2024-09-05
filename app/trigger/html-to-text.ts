import { JSDOM } from "jsdom";

export function htmlToText(html: string): string {
  const {
    window: { document },
  } = new JSDOM(html);

  // Remove script and style elements
  const scripts = document.getElementsByTagName("script");
  const styles = document.getElementsByTagName("style");

  console.log("scripts: ", scripts.length);
  console.log("styles: ", styles.length);
  console.log("body: ", document.body.textContent?.length);
  console.log("body: ", document.body.textContent?.slice(0, 4000));

  for (const script of Array.from(scripts)) script.remove();
  for (const style of Array.from(styles)) style.remove();

  // Get the text content
  const uncleanedContent = document.body.textContent || "";

  console.log("x length: ", uncleanedContent.length);
  console.log("x: ", uncleanedContent.slice(0, 2000));

  return uncleanedContent
    .replace(/\n\s*\n/g, "\n\n") // Replace newlines with surrounding whitespace with double newlines
    .replace(/[^\S\n]+/g, " ") // Replace other whitespace (except newlines) with a single space
    .replace(/^ +| +$/gm, "") // Remove leading/trailing spaces from each line
    .trim();
}
