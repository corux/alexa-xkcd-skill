import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, Intents } from "../utils";

@Intents("AMAZON.CancelIntent", "AMAZON.StopIntent")
export class AmazonStopIntentHandler extends BaseIntentHandler {
  public handle(handlerInput: HandlerInput): Response {
    const t = handlerInput.attributesManager.getRequestAttributes().t;

    return handlerInput.responseBuilder
      .speak(t("stop"))
      .withShouldEndSession(true)
      .getResponse();
  }
}
