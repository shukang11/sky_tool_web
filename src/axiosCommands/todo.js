import axios from "axios";
import { HOST, PREFIX_PATH, authParams } from "../http/api";
import Request from "../http/request";

const filter = filter => {
  const params = authParams()
    const url = `${HOST}${PREFIX_PATH}/todo/filter/${filter}`
  return Request.post(url, params)
}

export default {
  filter
};
