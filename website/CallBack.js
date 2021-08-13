$.getJSON("https://sosis.hadiazari.repl.co/server-icon.json", function (json) {
// console.log(json);

  json.Icons.map((v, i) => {

    console.log(v);
    var user = '<div class="card-user"><img class="img" src=' + v + '></br></div>';

    $(user).appendTo(CIELO);

  });

})