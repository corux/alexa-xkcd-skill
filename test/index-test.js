import test from 'ava';
import { handler as Skill } from '..';
import Request from 'alexa-request';
import chai from 'chai';
import chaiSubset from 'chai-subset';

const expect = chai.expect;
chai.use(chaiSubset);

test('LaunchRequest', () => {
  const event = Request.launchRequest().build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText' }
      }
    });
  });
});

test('LatestXkcd', () => {
  const event = Request.intent('LatestXkcd').build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText' }
      }
    });
  });
});

test('NumberXkcd', () => {
  const event = Request.intent('NumberXkcd', { num: '5' }).build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'Der Comic vom 1.1.2006 wurde an deine Alexa App gesendet. Was möchtest du als nächstes tun?' },
        card: { title: 'xkcd 5 vom 1.1.2006', type: 'Standard', image: {} }
      }
    });
  });
});

test('NumberXkcd with invalid number', () => {
  const event = Request.intent('NumberXkcd', { num: 'invalid-number' }).build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'Der Comic wurde nicht gefunden. Was möchtest du als nächstes tun?' }
      }
    });
  });
});

test('NumberXkcd with too large number', () => {
  const event = Request.intent('NumberXkcd', { num: '99999' }).build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'Der Comic wurde nicht gefunden. Was möchtest du als nächstes tun?' }
      }
    });
  });
});

test('AMAZON.StopIntent', () => {
  const event = Request.intent('AMAZON.StopIntent').build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText' }
      }
    });
  });
});

test('AMAZON.CancelIntent', () => {
  const event = Request.intent('AMAZON.CancelIntent').build();

  return Skill(event).then(response => {
    expect(response).to.containSubset({
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText' }
      }
    });
  });
});

test('SessionEndedRequest', () => {
  const event = Request.sessionEndedRequest().build();
  return Skill(event).then(response => {
    expect(response).to.deep.equal({});
  });
});
