import ogs from "open-graph-scraper"


export async function fetchOg(url) {
  try {
    let data = await ogs({ url: url });
    return data;
  } catch (e) {
    console.warn(e);
    return null;
  }
}
