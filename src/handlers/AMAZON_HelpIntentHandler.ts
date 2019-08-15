import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";

@Intents("AMAZON.HelpIntent")
export class AmazonHelpIntentHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t = handlerInput.attributesManager.getRequestAttributes().t;

    return handlerInput.getResponseBuilder()
      .speak(t("help.text"))
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
