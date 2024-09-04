const scrape = async (url: string): Promise<string> => {
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

  console.log("scrapeResponse: ", scrapeResponse);

  if (!scrapeResponse.success || !scrapeResponse.data.markdown) {
    throw new Error(scrapeResponse.error || "No markdown content found");
  }

  return scrapeResponse.data.markdown;
};

export default scrape;
