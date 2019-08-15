import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";
import { createResponse, getRandomNumber, getXkcd } from "../utils";

@Intents("AMAZON.FallbackIntent", "RandomXkcd")
export class RandomIntentHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const num = getRandomNumber(1, (await getXkcd()).num);
    return (await createResponse(handlerInput, "" + num))
      .getResponse();
  }
}
