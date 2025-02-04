function fetchWhois() {
    const domain = document.getElementById('domain').value;
    const resultDiv = document.getElementById('result');

    if (!domain) {
        resultDiv.innerHTML = `<p style="color: red;">Please enter a domain name.</p>`;
        return;
    }

    resultDiv.innerHTML = "Fetching WHOIS information...";

    // Using WhoisXML API to fetch WHOIS data
    fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_AnDNVBn21tRotmHcQIHPjSZL62N2p&domainName=${domain}&outputFormat=json`)
        .then(response => response.json())
        .then(data => {
            if (data.WhoisRecord) {
                const whoisInfo = data.WhoisRecord;
                
                // Extract nameservers
                const nameServers = whoisInfo.nameServers ? whoisInfo.nameServers.hostNames.join(', ') : 'N/A';

                const domainData = `
                    <p><strong>Domain Name:</strong> ${whoisInfo.domainName || 'N/A'}</p>
                    <p><strong>Registrar:</strong> ${whoisInfo.registrarName || 'N/A'}</p>
                    <p><strong>Nameservers:</strong> ${nameServers}</p>
                    <p><strong>Domain Status:</strong> ${whoisInfo.status || 'N/A'}</p>
                    <p><strong>Registered On:</strong> ${whoisInfo.createdDate || 'N/A'}</p>
                    <p><strong>Expiry Date:</strong> ${whoisInfo.expiresDate || 'N/A'}</p>
                    <p><strong>Updated On:</strong> ${whoisInfo.updatedDate || 'N/A'}</p>
                `;
                resultDiv.innerHTML = domainData;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">No WHOIS data found for ${domain}.</p>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}
