class HttpHelper {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    // request template
    async request(endpoint, method, body = null, customHeaders = []) {
        // backend url
        const url = `${this.apiUrl}${endpoint}`;
        
        // request config
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...customHeaders
            },
            credentials: 'include'
        };

        // if sending data, include it
        if (body) {
            options.body = JSON.stringify(body);
        }

        // call backend
        const response = await fetch(url, options);
        const data = await response.json();

        // return data
        return {
            data: data,
            status: response.status,
            headers: response.headers
        };
    }

    async get(endpoint, headers={}) {
        return await this.request(endpoint, 'GET', null, headers)
    }
    
    async post(endpoint, body, headers={}) {
        return await this.request(endpoint, 'POST', body, headers)
    }

    async put(endpoint, body, headers={}) {
        return await this.request(endpoint, 'PUT', body, headers)
    }

    async patch(endpoint, body, headers={}) {
        return await this.request(endpoint, 'PATCH', body, headers)
    }

    async delete(endpoint, body, headers={}) {
        return await this.request(endpoint, 'DELETE', body, headers)
    }
}