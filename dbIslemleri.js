const sql = require("mssql");
var webconfig = {
  user: "sa",
  password: "MEDIPOL",   
  server: '192.168.2.54',
  database: "MEDIPILIMDB",
  options: {
    encrypt: true
  }
};
module.exports.ListeGetirSanatci = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query("select * from dbo.Sanatci", function(err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render("sanatciListe", { veri: verisonucu.recordset });
    });
  });
};
module.exports.ListeGetirSanatciEkle = function(req, res) {
  res.render("sanatciEkle");
};
module.exports.ListeGetirSanatciEklePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "insert into Sanatci(SanatciAdi,SanatciYasiyormu,SanatciDogumTarihi,EklenmeTarihi) values('" +
        req.body.sAdi +
        "'," +
        req.body.sYasm +
        ",'" +
        req.body.sDogum +
        "',GETDATE());",
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Sanatçı Başarıyla Kaydedildi.</div>
            <a style="margin-top:10px;" class="button is-success" href="/liste">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};
module.exports.ListeGetirSanatciSil = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "delete from Sanatci where SanatciId = " + req.params.id,
      function(err, verisonucu) {
        if (err) {
          sql.close();
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Seçilen Sanatçının Albüm Listesinde Kaydı Vardır Silinemedi.</div>
            <a style="margin-top:10px;" class="button is-success" href="/liste">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
        } else {
          sql.close();

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
                <html>
                <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
                </head>
                <body>
                <div style="margin:20px;">
                <div>Sanatçı başarıyla silindi</div>
                <a style="margin-top:10px;" class="button is-success" href="/liste">Listeye Geri Dön</a>
                </div>
                </body>
                </html>
        `);
          res.end();
        }
      }
    );
  });
};

module.exports.ListeGetirAlbum = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query("select * from dbo.Album", function(err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render("albumListe", { veri2: verisonucu.recordset });
    });
  });
};
module.exports.ListeGetirAlbumEkle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query(
      "select * from MuzikTur;select SanatciId, SanatciAdi from Sanatci; ",
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        if (
          verisonucu.recordsets[0].length == 0 ||
          verisonucu.recordsets[1].length == 0
        ) {
          sql.close();
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
                <html>
                <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
                </head>
                <body>
                <div style="margin:20px;">
                <div>En az 1 sanatçı ve müzik türü kaydı bulunmalı.</div>
                <a style="margin-top:10px;" class="button is-success" href="/liste">Listeye Geri Dön</a>
                </div>
                </body>
                </html>
    `);
          res.end();
        } else {
          sql.close();
          res.render("albumEkle", { veri2_2: verisonucu.recordsets });
        }
      }
    );
  });
};
module.exports.ListeGetirAlbumEklePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "insert into dbo.Album(AlbumAdi,CikisTarihi,SanatciId,MuzikTurId) values('" +
        req.body.albumA +
        "','" +
        req.body.cikisT +
        "'," +
        req.body.sId +
        "," +
        req.body.mId +
        ");",
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Albüm Başarıyla Kaydedildi.</div>
            <a style="margin-top:10px;" class="button is-success" href="/albumListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};
module.exports.ListeGetirAlbumSil = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("delete Album where AlbumId = " + req.params.id, function(
      err,
      verisonucu
    ) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Albüm başarıyla silindi</div>
            <a style="margin-top:10px;" class="button is-success" href="/albumListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
    `);
      res.end();
    });
  });
};

module.exports.ListeGetirMuzikTurEkle = function(req, res) {
  res.render("muzikTurEkle");
};
module.exports.ListeGetirMuzikTurEklePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "insert into dbo.MuzikTur(MuzikTur) values('" + req.body.mTur + "');",
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Müzik Türü Başarıyla Kaydedildi.</div>
            <a style="margin-top:10px;" class="button is-success" href="/muzikListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};

module.exports.ListeGetirMuzikTur = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query("select *  from dbo.MuzikTur order by 1 asc", function(
      err,
      verisonucu
    ) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render("muzikListe", { veri3: verisonucu.recordset });
    });
  });
};
module.exports.ListeGetirMuzikTurSil = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "delete MuzikTur where MuzikTurId = " + req.params.id,
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Müzik türü başarıyla silindi</div>
            <a style="margin-top:10px;" class="button is-success" href="/muzikListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
    `);
        res.end();
      }
    );
  });
};

module.exports.ListeGetirSanatciGuncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query("select * from dbo.Sanatci", function(err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render("sanatciGuncelle", {
        veri: verisonucu.recordset,
        s_Id: req.params.id
      });
    });
  });
};
module.exports.ListeGetirSanatciGuncellePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "update Sanatci set SanatciAdi='" +
        req.body._sAdi +
        "',SanatciYasiyormu=" +
        req.body._sYasm +
        ",SanatciDogumTarihi='" +
        req.body._sDt +
        "' where SanatciId=" +
        req.body._sId,
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Sanatçı Başarıyla Güncellendi. </div>
            <a style="margin-top:10px;" class="button is-success" href="/liste">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};

module.exports.ListeGetirAlbumGuncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query(
      "select * from MuzikTur;select SanatciId, SanatciAdi from Sanatci;",
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        if (
          verisonucu.recordsets[0].length == 0 ||
          verisonucu.recordsets[1].length == 0
        ) {
          sql.close();
        } else {
          sql.close();
          res.render("albumGuncelle", {
            veri2_2: verisonucu.recordsets,
            a_Id: req.params.id
          });
        }
      }
    );
  });
};
module.exports.ListeGetirAlbumGuncellePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "update Album set AlbumAdi='" +
        req.body._aAdi +
        "',CikisTarihi='" +
        req.body._cikisT +
        "',SanatciId=" +
        req.body._sId +
        ",MuzikTurId=" +
        req.body._mId +
        " where AlbumId=" +
        req.body._aId,
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Albüm Başarıyla Güncellendi. </div>
            <a style="margin-top:10px;" class="button is-success" href="/albumListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};

module.exports.ListeGetirMuzikTurGuncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query("select * from MuzikTur", function(err, verisonucu) {
      if (err) {
        console.log(err);
      }

      sql.close();
      res.render("muzikTurGuncelle", { m_Id: req.params.id });
    });
  });
};
module.exports.ListeGetirMuzikTurGuncellePost = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "update MuzikTur set MuzikTur='" +
        req.body._mAdi +
        "' where MuzikTurId=" +
        req.body._mId,
      function(err, verisonucu) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            </head>
            <body>
            <div style="margin:20px;">
            <div>Müzik Türü Başarıyla Güncellendi. </div>
            <a style="margin-top:10px;" class="button is-success" href="/muzikListe">Listeye Geri Dön</a>
            </div>
            </body>
            </html>
            `);
        res.end();
      }
    );
  });
};
