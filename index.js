const prompt = require('./lib/questions');
const colors = require('colors');

// Welcome image function that displays after connection is made
afterConnect = () => {
      console.log(".-----------------------------------------------------.".yellow)
      console.log("|   ".yellow + " _____                 _                          ".magenta + "|".yellow)
      console.log("|   ".yellow + "| ____|_ __ ___  _ __ | | ___  _   _  ___  ___    ".magenta + "|".yellow)
      console.log("|   ".yellow + "|  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |___| | | | | | |_) | | (_) | |_| |  __/  __/   ".magenta + "|".yellow)
      console.log("|   ".yellow + "|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|   ".magenta + "|".yellow)
      console.log("|   ".yellow + " __  __         |_|            |___/              ".magenta + "|".yellow)
      console.log("|   ".yellow + "|  \\/  | __ _ _ __   __ _  __ _  ___ _ __         ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|        ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |  | | (_| | | | | (_| | (_| |  __/ |           ".magenta + "|".yellow)
      console.log("|   ".yellow + "|_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|           ".magenta + "|".yellow)
      console.log("|   ".yellow + "                          |___/                   ".magenta + "|".yellow)
      console.log('|                                                     |'.yellow)
      console.log("'-----------------------------------------------------'\n".yellow)
      prompt.mainPrompt();
    }

afterConnect();

