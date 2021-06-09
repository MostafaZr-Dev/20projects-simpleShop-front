import axios from "axios";

class httpService {
  constructor() {
    this.baseUrl = "http://localhost:5000/api/v1";

    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  get(url, configs) {
    return this.axios.get(url, configs);
  }

  post(url, data, configs) {
    return this.axios.post(url, data, configs);
  }

  put(url, data, configs) {
    return this.axios.put(url, data, configs);
  }

  delete(url, configs) {
    return this.axios.delete(url, configs);
  }
}

export default new httpService();
