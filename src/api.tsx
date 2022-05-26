export type Person = {
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            name: string;
            number: number;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: {
            latitude: string;
            longitude: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPeople = async (): Promise<Array<Person>> => {
    const response = await fetch(
        "https://randomuser.me/api/?results=20&seed=patata&nat=es"
    );
    const data = await response.json();

    // simulate bad network
    await sleep(2000);
    // simulate random errors
    if (Math.random() > 0.8) {
        throw new Error("FetchPeople: Something went wrong");
    }

    return data.results;
};
