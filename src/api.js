import axios from "axios";
import moment from "moment";

export default class ApiService {
  getData(id) {
    return axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
  }

  getInitialPostIds() {
    return axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
  }

  timeStamp = (unixTime) => {
    const milliseconds = unixTime * 1000;
    return moment(milliseconds).format("DD-MMM-YYYY hh:mm a");
  };
}
