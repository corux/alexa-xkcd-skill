import { SkillBuilders } from "ask-sdk-core";
import {
    AmazonHelpIntentHandler,
    AmazonStopIntentHandler,
    CustomErrorHandler,
    LaunchRequestHandler,
    RandomIntentHandler,
    SessionEndedHandler,
    XkcdIntentHandler,
} from "./handlers";
import { LocalizationInterceptor, LogInterceptor } from "./interceptors";

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
        new LocalizationInterceptor(),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .lambda();
