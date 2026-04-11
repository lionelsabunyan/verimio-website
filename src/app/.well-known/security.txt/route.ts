export function GET() {
  const body = `Contact: mailto:info@verimio.com.tr
Preferred-Languages: tr, en
Canonical: https://www.verimio.com.tr/.well-known/security.txt
Expires: 2027-04-11T00:00:00.000Z
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
