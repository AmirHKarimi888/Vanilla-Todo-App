import axios from "axios";

export const url = "https://64c10bfafa35860bae9fd682.mockapi.io/amirhk888/";

class Actions {
    constructor() {

    }

    async get(url, data) {
        await axios.get(url).then(data);
    }

    async post(url, data) {
        await axios.post(url, data);
    }

    async put(url, data) {
        await axios.put(url, data);
    }

    async delete(url) {
        await axios.delete(url);
    }

}

export const Action = new Actions();