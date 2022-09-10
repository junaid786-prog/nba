import { RAPID_API_HOST, RAPID_API_KEY } from "./redux/constants"

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
}
