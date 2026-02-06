export default {
    async fetch(request, env, ctx) {
        // Basic CORS handling
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                },
            });
        }

        try {
            const url = new URL(request.url);

            // Target URL configuration (should be set in vars or secrets)
            // For local dev, this might need pointing to ngrok or similar if using real CF workers
            // For now, we assume a backend URL is provided in env
            const backendUrl = env.BACKEND_URL || "http://localhost:8000";

            // Construct target URL
            const targetUrl = new URL(url.pathname + url.search, backendUrl);

            // Create new request to forward
            const proxyRequest = new Request(targetUrl.toString(), {
                method: request.method,
                headers: request.headers,
                body: request.body,
                redirect: "follow",
            });

            // Forward response
            const response = await fetch(proxyRequest);

            // Clone response to modifying headers
            const newResponse = new Response(response.body, response);
            newResponse.headers.set("Access-Control-Allow-Origin", "*");

            return newResponse;
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            });
        }
    },
};
