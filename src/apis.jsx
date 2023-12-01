const baseUrl = "https://www.eventbriteapi.com/v3";

export const tokenRequest = async (inputText) => {
    const config = {
        method: "GET"
    };
    const url = `${baseUrl}/users/me/?token=${inputText}`;
    const response = await fetch(url, config);
    return response.json();
}

export const orgRequest = async (user) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `${baseUrl}/users/${user.id}/organizations/`;
    const response = await fetch(url, config);
    const data = await response.json();
    return data.organizations[0].id;
}

export const allEvents = async (user) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `${baseUrl}/organizations/${user.orgId}/events/`;
    const response = await fetch(url, config);
    const data = await response.json();
    return data.events;
}

export const postNewEvent = async (user, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `${baseUrl}/organizations/${user.orgId}/events/`;
    const response = await fetch(url, config);
    const data = await response.json();
    return data.id;
}

export const getSingleEvent = async (user, id) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `${baseUrl}/events/${id}/`;
    const response = await fetch(url, config);
    return response.json();
}

export const updateEvent = async (user, id, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `${baseUrl}/events/${id}/`;
    const response = await fetch(url, config);
    const data = await response.json();
    return data.id;
}

export const deleteEvent = async (user, id) => {
    const config = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `https://private-anon-124a7d0191-eventbriteapiv3public.apiary-proxy.com/v3/events/${id}/`;
    const response = await fetch(url, config);
    return response.json();
}