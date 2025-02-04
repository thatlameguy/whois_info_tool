export default async function handler(req, res) {
    const domain = req.query.domain;
    if (!domain) {
        return res.status(400).json({ error: "Domain name is required" });
    }

    const apiKey = process.env.WHOIS_API_KEY;
    const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch WHOIS data" });
    }
}
