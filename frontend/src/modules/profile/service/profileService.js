
export const getProfileService = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
        method: "GET",
        credentials: 'include',
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }
    return data;
}

export const updateProfileService = async (payload) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type" : "application/json",
        },
        
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }

    return data;
}