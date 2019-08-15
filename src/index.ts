import { LocalizationInterceptor, LogInterceptor, SessionEndedHandler } from "@corux/ask-extensions";
import { SkillBuilders } from "ask-sdk-core";
import * as path from "path";
import {
    AmazonHelpIntentHandler,
    AmazonStopIntentHandler,
    CustomErrorHandler,
    LaunchRequestHandler,
    RandomIntentHandler,
    XkcdIntentHandler,
} from "./handlers";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        new AmazonStopIntentHandler(),
        new AmazonHelpIntentHandler(),
        new RandomIntentHandler(),
        new XkcdIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
    )
    .addErrorHandlers(
        new CustomErrorHandler(),
    )
    .addRequestInterceptors(
        new LogInterceptor(),
        new LocalizationInterceptor(path.join(__dirname, "i18n/{{lng}}.json")),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .lambda();
