import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import axios from "axios";

export async function getXkcd(num?: number): Promise<{
  num: number,
  title: string,
  img: string,
  alt: string,
  day: string,
  month: string,
  year: string,
}> {
  let url = "https://xkcd.com/";
  if (!!num) {
    url += `${num}/`;
  }
  url += "info.0.json";
  return (await axios.get(url)).data;
}

/** Gets a random number in the range [min, max]. */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

/**
 * Converts the given string to an integer, if and only if the string represents a valid integer.
 *
 * If the value is not a valid integer, NaN will be returned.
 */
function convertToInt(value: string): number {
  if (value === undefined) {
    return undefined;
  }
  const num = Number.parseInt(value, 10);
  if (("" + num) === value) {
    return num;
  }

  return Number.NaN;
}

export async function createResponse(handlerInput: HandlerInput, slotValue?: string): Promise<ResponseBuilder> {
  const t = handlerInput.attributesManager.getRequestAttributes().t;
  const error = () => handlerInput.responseBuilder
    .speak(t("response.not-found"))
    .reprompt(t("help.reprompt"));

  const num = convertToInt(slotValue);
  if (!num && num !== undefined) {
    return error();
  }
  try {
    const result = await getXkcd(num);
    const date = `${result.day}.${result.month}.${result.year}`;
    const image = `https://i35kgypfrd.execute-api.eu-west-1.amazonaws.com/production/${result.img}`;
    return handlerInput.responseBuilder
      .speak(t("response.speak", date))
      .reprompt(t("help.reprompt"))
      .withStandardCard(t("response.title", result.num, date), result.alt.replace(/[^ -~]+/g, ""), image, image);
  } catch (e) {
    return error();
  }
}
