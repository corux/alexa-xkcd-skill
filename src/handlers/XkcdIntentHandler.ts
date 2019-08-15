import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { IntentRequest, Response } from "ask-sdk-model";
import { createResponse } from "../utils";

@Intents("LatestXkcd", "NumberXkcd")
export class XkcdIntentHandler extends BaseRequestHandler {

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const slot = ((handlerInput.requestEnvelope.request as IntentRequest).intent.slots || {}).num;

    return (await createResponse(handlerInput, slot && slot.value))
      .getResponse();
  }
}
