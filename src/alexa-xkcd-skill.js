import { Skill, Launch, Intent, SessionEnded } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import ssml from 'alexa-ssml-jsx';
import request from 'request-promise-native';

@Skill
export default class AlexaXkcdSkill {

  async _getXkcd(num = undefined) {
    let url = 'https://xkcd.com/';
    if (!!num) {
      url += `${num}/`;
    }
    url += 'info.0.json';
    return JSON.parse(await request(url));
  }

  /**
   * Gets a random number in the range [min, max].
   */
  _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  /**
   * Converts the given string to an integer, if and only if the string represents a valid integer.
   * 
   * If the value is not a valid integer, NaN will be returned.
   */
  _convertToInt(value) {
    if (Number.isInteger(value)) {
      return value;
    }

    const number = Number.parseInt(value, 10);
    if (('' + number) === value) {
      return number;
    }

    return Number.NaN;
  }

  _createResponse(result) {
    const date = `${result.day}.${result.month}.${result.year}`;
    const image = `https://crossorigin.me/${result.img}`;
    return ask(`Der Comic vom ${date} wurde an deine Alexa App gesendet. Was möchtest du als nächstes tun?`).card({
      title: `xkcd ${result.num} vom ${date}`,
      type: 'Standard',
      text: result.alt.replace(/[^ -~]+/g, ''),
      image: {
        smallImageUrl: image,
        largeImageUrl: image
      }
    });
  }

  async _createResponseFor(num = undefined) {
    const error = () => {
      return ask('Der Comic wurde nicht gefunden. Was möchtest du als nächstes tun?');
    };

    if (!num && num !== undefined) {
      return error();
    }
    try {
      const result = await this._getXkcd(num);
      return this._createResponse(result);
    } catch (e) {
      return error();
    }
  }

  @Launch
  async launch() {
    return ask('Hallo! Mit xkcd Comics kannst du dir Comics an deine Alexa App senden. Was möchtest du als nächstes tun?')
      .reprompt('Du kannst z.B. nach dem neuesten Comic fragen. Oder auch nach dem Comic mit einer genauen Nummer.');
  }

  @Intent('LatestXkcd')
  async LatestXkcd() {
    return this._createResponseFor();
  }

  @Intent('RandomXkcd')
  async RandomXkcd() {
    const latest = await this._getXkcd();
    const randomNum = this._getRandomNumber(1, latest.num);
    return this.NumberXkcd({ num: randomNum });
  }

  @Intent('NumberXkcd')
  async NumberXkcd({ num }) {
    const number = this._convertToInt(num);
    return this._createResponseFor(number);
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return ask('Mit xkcd Comics kannst du dir Comics an deine Alexa App senden. Was möchtest du als nächstes tun?')
      .reprompt('Du kannst z.B. nach dem neuesten Comic fragen. Oder auch nach dem Comic mit einer genauen Nummer.');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    const texts = [
      'Auf wiedersehen',
      'Bis zum nächsten mal',
      'Bis später'
    ];
    return say(texts[this._getRandomNumber(0, texts.length - 1)]);
  }

  @SessionEnded
  sessionEnded() {
    // need to handle session ended event to circumvent error
    return {};
  }

}
