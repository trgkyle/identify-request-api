export default {
  async fetch(request, env, ctx) {
    // Get client IP address from the Cloudflare specific header
    const ip = request.headers.get('cf-connecting-ip');
    
    // Get location data from Cloudflare's cf object
    // In local development, this might be a placeholder unless tested with remote
    const location = request.cf || {};

    // Construct the response object
    const responseData = {
      ip: ip,
      city: location.city,
      country: location.country,
      region: location.region,
      regionCode: location.regionCode,
      latitude: location.latitude,
      longitude: location.longitude,
      postalCode: location.postalCode,
      timezone: location.timezone,
      continent: location.continent,
      // The aso (Autonomous System Organization) is often useful too
      asn: location.asn,
      organization: location.asOrganization,
      // Including the country header as requested by documentation reference
      countryHeader: request.headers.get('cf-ipcountry')
    };

    return new Response(JSON.stringify(responseData, null, 2), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        // Good practice for public APIs
        'access-control-allow-origin': '*', 
      },
    });
  },
};
