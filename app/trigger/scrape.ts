import { htmlToText } from "./html-to-text";

const firecrawlScrape = async (url: string): Promise<string> => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      waitFor: 1000,
    }),
  };

  const res = await fetch("https://api.firecrawl.dev/v1/scrape", options);
  const scrapeResponse = await res.json();

  console.log("scrapeResponse : ", scrapeResponse);

  if (!scrapeResponse.success || !scrapeResponse.data.markdown) {
    throw new Error(scrapeResponse.error || "No markdown content found");
  }

  return scrapeResponse.data.markdown;
};

const scrape = async (url: string): Promise<string> => {
  try {
    return await firecrawlScrape(url);
  } catch (error) {
    console.error("Error scraping url with firecrawl: ", url, error);
  }

  console.log("Scraping url with fetch...");
  const res = await fetch(url);
  const html = await res.text();
  console.log("length of html: ", html.length);
  console.log("html: ", html.slice(0, 1000));

  const text = htmlToText(html);

  console.log("length of text: ", text.length);
  console.log("Text: ", text.slice(0, 1000));
  return text;
};

export default scrape;
