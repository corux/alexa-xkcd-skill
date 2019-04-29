import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, createResponse, getRandomNumber, getXkcd, Intents } from "../utils";

@Intents("AMAZON.FallbackIntent", "RandomXkcd")
export class RandomIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const num = getRandomNumber(1, (await getXkcd()).num);
    return (await createResponse(handlerInput, "" + num))
      .getResponse();
  }
}
