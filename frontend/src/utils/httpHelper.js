class HttpHelper {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    // request template
    async request(endpoint, method, body = null, customHeaders = []) {
        // backend url
        const url = `${this.apiUrl}${endpoint}`;
        
        const isFormData = body instanceof FormData;
        // request config
        const options = {
            method: method,
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                ...customHeaders
            },
            credentials: 'include'
        };

        // if sending data, include it
        if (body) {
            options.body = isFormData ? body : JSON.stringify(body);
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

    async get(endpoint, options={}) {
        let url = `${this.apiUrl}${endpoint}`;

        //handle query params
        if(options.params){
            const queryString = new URLSearchParams(options.params).toString();
            url += `?${queryString}`;
        }

        return await this.request(url.replace(this.apiUrl, ''), 'GET', null, options.headers);
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

export const httpHelper = new HttpHelper(import.meta.env.VITE_SERVER_URL)