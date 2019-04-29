import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { BaseIntentHandler, createResponse, Intents } from "../utils";

@Intents("LatestXkcd", "NumberXkcd")
export class XkcdIntentHandler extends BaseIntentHandler {

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const slot = ((handlerInput.requestEnvelope.request as IntentRequest).intent.slots || {}).num;

    return (await createResponse(handlerInput, slot && slot.value))
      .getResponse();
  }
}
