export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Tarayıcı konum hizmetini desteklemiyor.");
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const reverseGeoAPI = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
                const response = await fetch(reverseGeoAPI);
                const data = await response.json();
                resolve({ coords: position.coords, address: data });
            },
            (error) => {
                reject(error.message);
            }
        );
    });
};