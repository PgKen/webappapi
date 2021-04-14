var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const fs = require("fs");

var moment = require("moment"); // require

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "comp@113",
  database: "srimuangweb",
});

conn.connect();

var conw = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "comp@113",
  database: "db_srimuangweb",
});

conw.connect();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/mainnews", (req, res) => {
  let mainData = [];
  let data = [];
  async function main() {
    await getnews();
  }
  main();

  function getnews() {
    let sql =
      "SELECT * FROM news Where atti!=3 AND atti = 2 ORDER BY date_snews DESC LIMIT 0,3";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }
  function mapdata() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        detail_news: item.detail_news.substring(0, 200),
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
      };
    });
    data = mData;
    mainData.push(data);
    getcsr();
  }

  function getcsr() {
    let sql =
      "SELECT * FROM news Where atti!=3 AND atti = 9 ORDER BY date_snews DESC LIMIT 0,3";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdataCsr();
    });
  }

  function mapdataCsr() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        detail_news: item.detail_news.substring(0, 200),
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
      };
    });
    data = mData;
    mainData.push(data);
    getstd();
  }

  function getstd() {
    let sql =
      "SELECT * FROM news Where atti=3 ORDER BY date_snews DESC LIMIT 0,3";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdataStd();
    });
  }

  function mapdataStd() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        detail_news: item.detail_news.substring(0, 200),
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
      };
    });
    data = mData;
    mainData.push(data);
    sendata();
  }

  function sendata() {
    res.send(mainData);
  }
});

router.get("/apinews", (req, res) => {
  let data = [];
  async function main() {
    await getnews();
  }
  main();
  function getnews() {
    // let sql =
    //   "SELECT * FROM news Where atti!=3 AND atti = 2 ORDER BY date_snews DESC LIMIT 0,9";
    let sql =
      "SELECT * FROM news Where atti!=3 AND atti = 2 ORDER BY id_news DESC LIMIT 0,9";
    conw.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        detail_news: item.detail_news.substring(0, 200),
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.get("/apinews_backend", (req, res) => {
  let data = [];
  let q_fav = req.query.fav;
  console.log("q_fav = " + q_fav);
  if (q_fav != undefined) {
    
    varQuery = "fav DESC";
    if(q_fav == 1){
      varQuery = "fav DESC";
    }else{
      varQuery = "fav ASC";
    }
  } else {
    console.log("q_fav_underfined " + q_fav);
    varQuery = "id_news DESC";
  
  }

  async function main() {
    await getnews();
  }
  main();
  // ken
  function getnews() {
    // let sql =
    //   "SELECT * FROM news Where atti!=3 AND atti = 2 ORDER BY date_snews DESC LIMIT 0,9";
    let sql =
      "SELECT * FROM news Where atti!=3 AND atti = 2 ORDER BY " +
      varQuery +
      " LIMIT 0,20";
    console.log(sql);
    conw.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        // detail_news: item.detail_news.substring(0, 200),
        detail_news: item.detail_news,
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        // pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
        // picnews: "https://www.taladsrimuang.com/news/upload/" + item.picnews,
        pa: "http://localhost:3435/upload/" + item.pa,
        picnews: "http://localhost:3435/upload/" + item.picnews,
        fav: item.fav,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.get("/apicsr", (req, res) => {
  let data = [];
  async function main() {
    await getnews();
  }
  main();

  function getnews() {
    let sql =
      "SELECT * FROM news Where atti!=3 AND atti = 9 ORDER BY date_snews DESC LIMIT 0,9";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let mData = data.map((item) => {
      return {
        id_news: item.id_news,
        title_news: item.title_news,
        detail_news: item.detail_news.substring(0, 200),
        date_snews: item.date_snews,
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.get("/detailnews/", (req, res) => {
  let id = req.query.id;
  console.log(`id = ${id}`);

  let data = [];
  async function main() {
    await getnews();
  }
  main();

  function getnews() {
    // let sql = "SELECT * FROM news INNER JOIN picnews ON news.id_news = picnews.picnews_id Where atti!=3 AND id_news = ?";
    let sql =
      "SELECT * FROM picnews INNER JOIN news ON picnews.picnews_id = news.id_news WHERE id_news = ?";
    conw.query(sql, [id], (err, resp) => {
      // ken
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let yearth = "";
    let mData = data.map((item) => {
      yearth = moment(item.date_snews).add(543, "year");
      return {
        id_news: item.id_news,
        id_picnews: item.id_picnews,
        title_news: item.title_news,
        detail_news: item.detail_news,
        // date_snews: moment(item.date_snews).format("DD-MM-YYYY"),
        date_snews: moment(yearth).format("DD-MM-YYYY"),
        count_read: item.count_read,
        fileattach: item.fileattach,
        atti: item.atti,
        title_news_en: item.title_news_en,
        detail_news_en: item.detail_news_en,
        // pa: "https://www.taladsrimuang.com/news/upload/" + item.pa,
        // picnews: "https://www.taladsrimuang.com/news/upload/" + item.picnews,
        pa: "http://localhost:3435/upload/" + item.pa,
        picnews: "http://localhost:3435/upload/" + item.picnews,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.get("/vegetable", (req, res) => {
  let data = [];
  async function main() {
    await getData();
  }
  main();

  function getData() {
    let sql = "SELECT * FROM tbb WHERE id_gb= 4 ORDER BY date_b DESC LIMIT 0,9";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapData();
    });
  }

  function mapData() {
    let yearth = "";
    let mData = data.map((item) => {
      yearth = moment(item.date_b).add(543, "year");
      return {
        id: item.id_b,
        titile: item.titile_b,
        detail: item.detail_b.substring(0, 200),
        pic: "https://www.taladsrimuang.com/gb/upload/" + item.pic_b,
        read: item.read_b,
        date: moment(yearth).format("DD-MM-YYYY"),
        time: item.time_b,
        title_en: item.titile_b_en,
        detail_en: item.detail_b_en,
      };
    });
    data = mData;
    sendData();
  }

  function sendData() {
    res.send(data);
  }
});

router.get("/detailvegetable/", (req, res) => {
  let id = req.query.id;
  console.log(`id = ${id}`);

  let data = [];
  async function main() {
    await getnews();
  }
  main();

  function getnews() {
    // let sql = "SELECT * FROM picnews INNER JOIN news ON picnews.picnews_id = news.id_news WHERE id_news = ?"
    let sql =
      "SELECT * FROM tbpicb INNER JOIN tbb ON tbpicb.idb = tbb.id_b WHERE id_b = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let yearth = "";
    let mData = data.map((item) => {
      yearth = moment(item.date_b).add(543, "year");
      return {
        id: item.idb,
        id_pic: item.id_picb,
        title: item.titile_b,
        detail: item.detail_b,
        // date_snews: moment(item.date_snews).format("DD-MM-YYYY"),
        date: moment(yearth).format("DD-MM-YYYY"),
        read: item.read_b,
        // fileattach: item.fileattach,
        // atti: item.atti,
        title_news_en: item.titile_b_en,
        detail_news_en: item.detail_b_en,
        pa: "https://www.taladsrimuang.com/gb/upload/" + item.pic_b,
        pic: "https://www.taladsrimuang.com/gb/upload/" + item.picbod,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.get("/apitest", (req, res) => {
  let data = [];
  async function main() {
    await getTest();
  }
  main();

  function getTest() {
    // let sql =
    // "SELECT * FROM news Where atti!=3 AND atti = 9 ORDER BY date_snews DESC LIMIT 0,9";
    let sql =
      "SELECT * FROM tbb WHERE id_gb = 1 ORDER BY date_b DESC LIMIT 0,9 ";
    conn.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      data = resp;
      mapdata();
    });
  }

  function mapdata() {
    // console.log(data);
    let yearth = "";
    let mData = data.map((item) => {
      yearth = moment(item.date_b).add(543, "year");
      return {
        id: item.id_b,
        title: item.titile_b,
        detail: item.detail_b.substring(0, 200),
        date: yearth.format("DD-MM-YYYY"),
        read: item.read_b,
        // fileattach: item.fileattach,
        // atti: item.atti,
        title_en: item.title_news_en,
        detail_en: item.detail_news_en,
        pic: "https://www.taladsrimuang.com/gb/resize/resize_" + item.pic_b,
      };
    });
    data = mData;
    sendata();
  }

  function sendata() {
    res.send(data);
  }
});

router.post("/qanda", (req, res) => {
  // console.log("q and a");
  // console.log(req.body);
  let q = req.body.question;
  let a = req.body.answer;
  let sql = "INSERT INTO qa(question,answer,status) VALUE(?,?,?)";
  conw.query(sql, [q, a, 1], (err, resp) => {
    if (err) throw console.log(err);
    res.end();
  });
});

router.get("/apiqa", (req, res) => {
  async function main() {
    getData();
  }
  main();

  function getData() {
    let sql = "SELECT * FROM qa ";
    conw.query(sql, (err, resp) => {
      data = resp;
      sendData();
    });
  }

  function sendData() {
    res.send(data);
  }
});

router.get("/delquestion/:id", (req, res) => {
  let id_news = 0;
  let id = req.params.id;
  // console.log(id);
  let sql = "DELETE FROM qa WHERE id = ?";
  conw.query(sql, [id], (err, resp) => {
    if (err) throw console.log(err);
    res.end();
  });
});

router.post("/cmsupload", (req, res) => {
  // let data = req.body.file
  let file1 = req.files.file1;
  let g_id = 0;
  console.log(file1.name);

  console.log(req.body.title);
  console.log(req.body.detail);
  // console.log("Title = "+ title);
  // console.log("Detail = "+ edtail);
  console.log(Object.keys(req.files.file1));

  if (!req.files.file3) {
    console.log("file3 not");
  } else {
    console.log("file3 have");
  }

  async function main() {
    await getFile1();
  }
  main();

  function getFile1() {
    console.log("*****");
    // log(req.files);
    // log(req.files.file3);
    console.log("*****");
    let title = req.body.title;
    let detail = req.body.detail;
    let datenow = moment().format("YYYY-MM-DD");

    if (!req.files.file1) {
      // return res.status(400).send("No files were uploaded.");
      console.log("not file1");
      // red.end();
      getAlbum();
    } else {
      let sampleFile = req.files.file1;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // console.log(namePic);
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      // console.log(namePic);
      let sql =
        "INSERT INTO news (title_news,detail_news,pa,date_snews,atti) VALUES (?,?,?,?,?)";

      sampleFile.mv("./public/upload/" + namePic, function (errx) {
        //   // if (err) return res.status(500).send(err);
        conw.query(sql, [title, detail, namePic, datenow, 2], (err, resIns) => {
          //     if (err) throw console.log(err);
          console.log("upload 1 Ok");
          getAlbum();
        });
      });
    }
  }

  function getAlbum() {
    let sql = "SELECT * FROM news ORDER BY id_news DESC LIMIT 0,1";
    conw.query(sql, (err, resp) => {
      if (err) throw console.log(err);
      console.log("getAlbum");
      console.log(resp[0].id_news);
      g_id = resp[0].id_news;
      // res.end();
      getFile2();
    });
  }

  function getFile2() {
    if (!req.files.file2) {
      // return res.status(400).send("No files were uploaded.");
      getFile3();
    } else {
      let sampleFile = req.files.file2;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile3();
        });
      });
    }
  }

  function getFile3() {
    if (!req.files.file3) {
      // return res.status(400).send("No files were uploaded.");
      getFile4();
    } else {
      let sampleFile = req.files.file3;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile4();
        });
      });
    }
  }

  function getFile4() {
    if (!req.files.file4) {
      // return res.status(400).send("No files were uploaded.");
      getFile5();
    } else {
      let sampleFile = req.files.file4;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile5();
        });
      });
    }
  }

  function getFile5() {
    if (!req.files.file5) {
      // return res.status(400).send("No files were uploaded.");
      getFile6();
    } else {
      let sampleFile = req.files.file5;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile6();
        });
      });
    }
  }

  function getFile6() {
    if (!req.files.file6) {
      // return res.status(400).send("No files were uploaded.");
      getFile7();
    } else {
      let sampleFile = req.files.file6;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile7();
        });
      });
    }
  }

  function getFile7() {
    if (!req.files.file7) {
      // return res.status(400).send("No files were uploaded.");
      getFile8();
    } else {
      let sampleFile = req.files.file7;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile8();
        });
      });
    }
  }

  function getFile8() {
    if (!req.files.file8) {
      // return res.status(400).send("No files were uploaded.");
      getFile9();
    } else {
      let sampleFile = req.files.file8;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + sampleFile.name;
      // let sql = "INSERT INTO picture(id_pro,	name_img, active_img) VALUES (?,?,?)";
      let sql = "INSERT INTO picnews (picnews_id,picnews) VALUES (?,?)";
      sampleFile.mv("./public/upload/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        conw.query(sql, [g_id, namePic], (err, resIsn) => {
          if (err) throw console.log(err);
          getFile9();
        });
      });
    }
  }

  function getFile9() {
    console.log("9");
    res.end();
  }

  // let file2 = req.files.file2
  // let file3 = req.files.file3
  // let file4 = req.files.file4
  // let file5 = req.files.file5
  // let file6 = req.files.file6
  // let file7 = req.files.file7
  // let file8 = req.files.file8
  // console.log(file1.name);
  // console.log(file2.name);
  // console.log(file3.name);
  // console.log(file4.name);
  // console.log(file5.name);
  // console.log(file6.name);
  // console.log(file7.name);
  // console.log(file8.name);
  // res.send()
  function sendData() {
    res.end();
  }
});

router.delete("/delItemNews/:id", (req, res) => {
  //public/upload/
  let id = req.params.id;

  let dataItem = [];
  console.log("del id = " + id);
  // res.end();

  async function main() {
    await listItem();
  }
  main();

  function listItem() {
    console.log(" listItem del id = " + id);
    let sql = "SELECT * FROM picnews WHERE picnews_id = ?";
    conw.query(sql, [id], (err, resp) => {
      //picnews
      console.log(resp);
      dataItem = resp;
      if (resp.length > 0) {
        fuDelPicture();
      } else {
        delNews();
      }
    });
  }

  function fuDelPicture() {
    // let sql = "DELETE FROM picnews WHERE picnews_id = ?"
    let fileName = "";
    for (let i = 0; i < dataItem.length; i++) {
      fileName = "./public/upload/" + dataItem[i].picnews;
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(err);
        }
        delItem();
      });
      if (i == dataItem - 1) {
        sendData();
      }
    }
  }

  function delItem() {
    let sql = "DELETE FROM picnews WHERE picnews_id = ?";
    conw.query(sql, [id], (err, resp) => {
      if (err) throw console.log(err);
      delNews();
    });
  }

  function delNews() {
    let sql = "DELETE FROM news WHERE id_news = ?";
    conw.query(sql, [id], (err, resp) => {
      if (err) throw console.log(err);
      sendData();
    });
  }

  function sendData() {
    console.log("end Del");
    res.end();
  }
});

router.get("/setfav/:id/:i", (req, res) => {
  let id = req.params.id;
  let i = req.params.i;
  console.log("id = " + id);
  console.log("i = " + i);
  let sql = "UPDATE news SET fav=? WHERE id_news = ?";
  conw.query(sql, [i, id], (err, resp) => {
    console.log(resp);
    res.send(resp);
  });
});

router.post('/cmsupdate',(req,res)=>{
  console.log("cms update");
  let data = req.body
  let id = req.body.id
  let title = req.body.title
  let detail = req.body.detail
  console.log(id);
  console.log(title);
  console.log(detail);
  let sql = "UPDATE news SET title_news = ? ,detail_news = ? WHERE id_news = ? "
  conw.query(sql,[title,detail,id],(err,resp)=>{
    if(err)throw console.log(err);
    console.log("edite ok");
    res.end();
  })
})


router.get('/updateStatusQa/:id/:i',(req,res)=>{
  let id = req.params.id
  let i = req.params.i
  let sql = "UPDATE qa SET status = ? WHERE id = ?"
  conw.query(sql,[i,id],(err,resp)=>{
    if(err)throw console.log(err);
    res.send("ok")
  })
})

router.get('/editnews/:id',(req,res)=>{
  let id = req.params.id
  let sql = "SELECT * FROM news WHERE id_news = ?"
  conw.query(sql,[id],(err,resp)=>{
    if(err)throw console.log(err);
    console.log(resp);
    res.send(resp)
  })
})

router.get('/qalist',(req,res)=>{
  let sql = "SELECT * FROM qa WHERE status = 1"
  conw.query(sql,(err,resp)=>{
    if(err) throw console.log(err);
    console.log(resp);
    res.send(resp)
  })
})


module.exports = router;
