import { SkillResponse, VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("xkcd Handler", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
    alexa.filter((requestJSON) => {
      requestJSON.request.locale = "de-DE";
    });
  });

  const expectCard = (result: SkillResponse) => {
    expect(result.response.card.image.smallImageUrl)
      .toBe(result.response.card.image.largeImageUrl);
    expect(result.response.card.image.smallImageUrl)
      .toContain("https://i35kgypfrd.execute-api.eu-west-1.amazonaws.com/production/");
  };

  ["RandomXkcd", "AMAZON.FallbackIntent"].forEach((intent) => {
    test(intent, async () => {
      const result = await alexa.request().intent(intent).send();

      expect(result.response.outputSpeech.ssml)
        .toContain("Der Comic vom");
      expect(result.response.shouldEndSession).toBe(false);
      expectCard(result);
    });
  });

  test("xkcd with invalid number", async () => {
    const result = await alexa.request()
      .intent("NumberXkcd").slot("num", "invalid-number")
      .send();

    expect(result.response.outputSpeech.ssml)
      .toContain("Der Comic wurde nicht gefunden.");
    expect(result.response.shouldEndSession).toBe(false);
  });

  test("xkcd with out-of-range number", async () => {
    const result = await alexa.request()
      .intent("NumberXkcd").slot("num", "99999")
      .send();

    expect(result.response.outputSpeech.ssml)
      .toContain("Der Comic wurde nicht gefunden.");
    expect(result.response.shouldEndSession).toBe(false);
  });

  test("xkcd with valid number", async () => {
    const result = await alexa.request()
      .intent("NumberXkcd").slot("num", "5")
      .send();

    expect(result.response.outputSpeech.ssml)
      .toContain("Der Comic vom 1.1.2006 wurde an deine Alexa App gesendet. Was möchtest du als nächstes tun?");
    expect(result.response.card.title).toBe("xkcd 5 vom 1.1.2006");
    expect(result.response.card.text).toBe("Blown into prime factors");
    expectCard(result);
    expect(result.response.shouldEndSession).toBe(false);
  });

  test("latest xkcd", async () => {
    const result = await alexa.request()
      .intent("LatestXkcd")
      .send();

    expect(result.response.outputSpeech.ssml)
      .toContain("Der Comic vom");
    expect(result.response.card.title).toContain("vom");
    expectCard(result);
    expect(result.response.shouldEndSession).toBe(false);
  });
});
