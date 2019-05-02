const express = require("express");
//const ejs = require('ejs');
const bp = require("body-parser");

const app = express();
const port = 3000;
const db = require("./dbIslemleri");

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
//sanatçı
app.get("/", db.ListeGetirSanatci);
app.get("/liste", db.ListeGetirSanatci);
app.get("/liste/:id", db.ListeGetirSanatciSil);
app.get("/sanatciEkle", db.ListeGetirSanatciEkle);
app.post("/sanatciEkle", db.ListeGetirSanatciEklePost);
//
//Sanatçı guncelleme
app.get("/sanatciGuncelle/:id", db.ListeGetirSanatciGuncelle);
app.post("/sanatciGuncellendi", db.ListeGetirSanatciGuncellePost);
//
//album
app.get("/albumListe", db.ListeGetirAlbum);
app.get("/albumListe/:id", db.ListeGetirAlbumSil);
app.get("/albumEkle", db.ListeGetirAlbumEkle);
app.post("/albumEkle", db.ListeGetirAlbumEklePost);
//
//Albüm güncelleme
app.get("/albumGuncelle/:id", db.ListeGetirAlbumGuncelle);
app.post("/albumGuncellendi", db.ListeGetirAlbumGuncellePost);
//
//muzik
app.get("/muzikListe", db.ListeGetirMuzikTur);
app.get("/muzikTurEkle", db.ListeGetirMuzikTurEkle);
app.post("/muzikTurEkle", db.ListeGetirMuzikTurEklePost);
app.get("/muzikTur/:id", db.ListeGetirMuzikTurSil);
//
//Muzik güncelleme
app.get("/muzikTurGuncelle/:id", db.ListeGetirMuzikTurGuncelle);
app.post("/muzikTurGuncellendi", db.ListeGetirMuzikTurGuncellePost);
//

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
