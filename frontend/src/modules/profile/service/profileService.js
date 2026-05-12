const BASE_URL = "http://localhost:5000";

export const getProfileService = async (token) => {
    const res = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }
    return data;
}

export const updateProfileService = async (token, payload) => {
    const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }

    return data;
}