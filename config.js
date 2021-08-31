module.exports = {
  Admins: ["UserID", "UserID"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || "..", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "discord.gg/fZgaYkRENQ", //Support Server Link
  Token: process.env.Token || "ODYzMzQ2MDUxMDY3MDE5MjY2.YOljqg.j_tAEOr9PSLIu0H5hF40YIECLwU", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "863346051067019266", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "-BwhowA6brtbz_8MLnQqdKi1-mbNyREn", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is EPIC", //A Secret like a password
  IconURL:
    "https://media.discordapp.net/attachments/845482702211514378/863936405406351410/1f299da3fe38c5b9.jpg", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "http://localhost", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink
   Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80,
    pass: "youshallnotpass", 
  },
  
  //Alternate Lavalink
  /*
  Lavalink: {
    id: "Main",
    host: "lava.sudhan.tech",
    port: 1234,
    pass: "CodingWithSudhan", 
  },
  */

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "", //Spotify Client Secret
  },
};
