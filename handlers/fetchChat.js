import axios from "axios";
import env from "expo-constants";

const ENDPOINT = env.manifest.extra.proxy;

const fetchChat = async ({ cursorParam = 1 }) => {
  const res = await axios.get(
    `${ENDPOINT}/api/chat/${user.user.username}?cursor=${cursorParam}`
  );
  return res.data;
};
