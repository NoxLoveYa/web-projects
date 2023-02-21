// ==UserScript==
// @name         Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://lichess.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function resolveAfterXSeconds(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, seconds * 1000);
  });
}

function getColor(username) {
  return new Promise(resolve => {
      let color = ""

      const test = document.getElementsByClassName("game__meta__players");
      const users = test[0].children

      for (let user of users) {
          if (user.innerHTML.includes(username)) {
              if (user.className.includes("white")){
                  color = "white"
              } else {
                  color = "black"
              }
              break;
          }
      }
      resolve(color);
  });
}

function getPieces(color) {
    return new Promise(resolve => {
        let pieces_sorted = {
            self: [],
            ennemy: []
        }

        const pieces = document.getElementsByTagName("piece")

        for (let i = 0; i < 33; i++){

        let class_test = pieces[i].className;
        if (class_test == "ghost") { continue;}
        else {
            if (class_test.includes(color)){
                pieces_sorted.self.push({Name: class_test, Case: pieces[i].cgKey})
            } else {
                pieces_sorted.ennemy.push({Name: class_test, Case: pieces[i].cgKey})
            }
        }
    }
        resolve(pieces_sorted);
    });
}

(async function() {
    let username = "Anonyme"
    console.log("loading...");
    await resolveAfterXSeconds(2);

    const color = await getColor(username);

    let pieces = await getPieces(color);
    console.log(pieces);
})();