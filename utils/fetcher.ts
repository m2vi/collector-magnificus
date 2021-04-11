export default async function fetcher(url: string): Promise<any> {
  const res = await fetch(url);
  const json: any = await res.json();
  return json;
}
