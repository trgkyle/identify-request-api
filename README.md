# Identify Request API

A simple, open-source Cloudflare Worker API that identifies the requestor's IP address and geolocation information.

**Live Demo:** [https://identify-request-api.onegreen.workers.dev/](https://identify-request-api.onegreen.workers.dev/)

## Features

- **IP Detection**: Returns the connecting client's IP address.
- **Geolocation**: Provides detailed location data including City, Country, Region, Latitude, Longitude, Timezone, and Continent.
- **Network Info**: Returns ASN (Autonomous System Number) and Organization.
- **JSON Response**: Returns a clean, flat JSON object.
- **CORS Enabled**: Ready to be consumed by client-side applications.

## API Response

The API returns a JSON object with the following structure:

```json
{
  "ip": "203.0.113.1",
  "city": "San Francisco",
  "country": "US",
  "region": "California",
  "regionCode": "CA",
  "latitude": "37.7749",
  "longitude": "-122.4194",
  "postalCode": "94107",
  "timezone": "America/Los_Angeles",
  "continent": "NA",
  "asn": 13335,
  "organization": "Cloudflare, Inc.",
  "countryHeader": "US"
}
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/one-green/identify-request-api.git
   cd identify-request-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally:
   ```bash
   npm run dev
   ```
   *Note: Local development may not show real Cloudflare location data unless you use `--remote`.*

4. Deploy:
   ```bash
   npm run deploy
   ```

## License

MIT

