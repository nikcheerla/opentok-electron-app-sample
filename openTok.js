const OT = require('@opentok/client');

// Set Credentials
const apiKey = "46908704";
const sessionId = "1_MX40NjkwODcwNH5-MTYxNDkwNjEyMTIyOH5td1F0bXBTNllyMVhxd29GSlFScVBDYS9-fg";
const token = "T1==cGFydG5lcl9pZD00NjkwODcwNCZzaWc9ZDMxMjUxZmE2YzVjYWVmNDM0MWQ2ZGRlOWU4MDhjMWFlYzIyNWRkYTpzZXNzaW9uX2lkPTFfTVg0ME5qa3dPRGN3Tkg1LU1UWXhORGt3TmpFeU1USXlPSDV0ZDFGMGJYQlRObGx5TVZoeGQyOUdTbEZTY1ZCRFlTOS1mZyZjcmVhdGVfdGltZT0xNjE4MDAzNDExJmV4cGlyZV90aW1lPTE2MTgwODk4MTEmcm9sZT1wdWJsaXNoZXImbm9uY2U9NTExMzE3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9JmNvbm5lY3Rpb25fZGF0YT0lN0IlMjJuYW1lJTIyJTNBKyUyMk5pa2hpbCtDaGVlcmxhJTIyJTJDKyUyMmlkJTIyJTNBKyUyMjEwOTA2NDQ1MDU4ODEwMjQzMzI5MiUyMiUyQyslMjJwcm9mX3BpYyUyMiUzQSslMjJodHRwcyUzQSUyRiUyRmxoMy5nb29nbGV1c2VyY29udGVudC5jb20lMkZhLSUyRkFPaDE0R2lQTDhMbXVfbzZaLTA2UERiMjktU2NKZ2tuUzA4dUI1TTlIRm9FJTNEczk2LWMlMjIlN0Q=";
// if (!apiKey || !sessionId || !token) {
//   alert('You need to add your apiKey, sessionId and token to openTok.js');
// }

// Initialize Session
const session = OT.initSession(apiKey, sessionId);

// Set session event listeners
session.on({
  streamCreated: (event) => {
    session.subscribe(event.stream, 'subscriber', (error) => {
      if (error) {
        console.error(`There was an issue subscribing to the stream: ${error}`);
      }
    });
  },
  streamDestroyed: (event) => {
    console.log(`Stream with name ${event.stream.name} ended because of reason: ${event.reason}`);
  }
});

// Create a publisher
const publisher = OT.initPublisher('publisher', (initError) => {
  if (initError) {
    console.error(`There was an error initializing the publisher: ${initError}`);
  }
});

// Connect to the session
session.connect(token, (error) => {
  // If the connection is successful, initialize a publisher and publish to the session
  if (error) {
    console.error(`There was an error connecting to session: ${error}`);
    publisher.destroy();
    return;
  }
  session.publish(publisher, (pubError) => {
    if (pubError) {
      console.error(`There was an error when trying to publish: ${pubError}`);
    }
  });
});
