interface City {
    name: string;
    latitude: number;
    longitude: number;
}



interface formErrors {
    origin: string,
    destination: string,
    date: string,
    passengers: string,
}

export type {
    City,
    formErrors
}