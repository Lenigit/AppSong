console.log("require");
const express = require('express');
const app = express();
const fs = require("fs");
const bodyparser = require('body-parser');

const port = 8083;
console.log("json");
var users = JSON.parse(fs.readFileSync('public/users.json', 'utf-8'));
const albums = JSON.parse(fs.readFileSync('public/albums.json', 'utf-8'));
const songs = JSON.parse(fs.readFileSync('public/songs.json', 'utf-8'));
var playlists = JSON.parse(fs.readFileSync('public/playlists.json', 'utf-8'));

//Nombre aléatoire
const rand = function () {
    return Math.random().toString(36).substr(2);
};

const token = function () {
    return rand() + rand(); // to make it longer
};

app.use(bodyparser.urlencoded({ extended: true }));
console.log("server listening ...");

app.use(function (req, res, next) {

    res.header("Access-control-Allow-origin", "*");

    res.header("Access-control-Allow-headers", "content-type");

    res.header("Access-control-Allow-methods", "GET,POST,OPTIONS");
    next();
})
app.use(bodyparser.json());


app.post('/addUser', function (req, res) {
    let data = req.body;


    let lastId = users[users.length - 1].id;
    let user = users.find(x => x.login == data.login);

    if (user == undefined) {
        try {
            users.push({ id: lastId + 1, ...data, likes: [] });
            fs.writeFileSync('public/users.json', JSON.stringify(users));
            res.json({ error: false, id: lastId + 1, login: data.login });
        } catch (e) {
            res.json({ error: true });
        }
    } else {
        res.json({ error: true });
    }
})
app.post('/isLogged', function (req, res) {

    let data = req.body;

    let user = users.find(x => x.id == data.id && x.token == data.token && x.token != '');

    if (user) {
        res.json({ access: true, id: user.id, login: user.login });
    }
    else {
        res.json({ access: false });
    }
})
app.post('/login', function (req, res) {
    let data = req.body;
    let user = users.find(x => x.login == data.login && x.password == data.password);

    if (user) {
        user.token = token();
        fs.writeFileSync('public/users.json', JSON.stringify(users));
        res.json({ logged: true, id: user.id, login: user.login, token: user.token });
    }
    else {
        res.json({ logged: false });
    }
})

app.post('/logout', function (req, res) {
    let data = req.body;
    for (let user of users) {
        if (user.id == data.id) {
            user.token = '';
        }
    }
    fs.writeFileSync('public/users.json', JSON.stringify(users));
})

app.get('/top', function (req, res) {
    let topList = [];
    for (let s of songs) {
        let song_nfo = {
            song_id: s.id,
            song_link: s.link,
            song_title : s.title,
            album_id: s.id_album,
            song_style: s.style,
            song_likes: s.likes
        };

        let album = albums.find(x => x.id == s.id_album);
        let album_nfo = {
            album_artist : album.artiste,
            album_img : album.img,
            album_title :album.title,
            album_year : album.year
        };


        topList.push({...song_nfo, ...album_nfo});
    }
    topList.sort((a, b) => (a.song_likes < b.song_likes) ? 1 : ((b.song_likes < a.song_likes) ? -1 : 0)).slice(0, 50);
    res.json({ topList: topList});
})


app.get('/user/:id', function (req, res) {
    let id = req.params.id;
    let user = users.find(x => x.id == id);
    res.json({ login: user.login });
})

app.get('/userPlaylists/:id', function (req, res) {
    let id_user = req.params.id;
    let userPlaylists = [];
    for (let pl of playlists) {
        if (pl.id_user == id_user) {
            userPlaylists.push(pl);
        }
    }
    res.json({ error: false, playlists: userPlaylists });
});

app.post('/newPlaylist', function (req, res) {
    console.log("Adding playlist for id " + req.body.iduser + " : " + req.body.name);
    let idpl = Date.now();
    let newPlaylist = {
        id: idpl,
        id_user: req.body.iduser,
        playlist: [],
        name: req.body.name
    }
    playlists.push(newPlaylist);
    fs.writeFileSync('public/playlists.json', JSON.stringify(playlists));
    res.json({ error: false, playlist: newPlaylist });
});

app.post('/deletePlaylist', function (req, res) {
    console.log("Deleting playlist : " + req.body.idpl);
    let global_pl = [];
    for (let pl of playlists) {
        if (pl.id != req.body.idpl) {
            global_pl.push(pl);
        }
    }
    fs.writeFileSync('public/playlists.json', JSON.stringify(global_pl));
    playlists = global_pl;

    let user_pl = [];
    for (let pl of req.body.user_playlists) {
        if (pl.id != req.body.idpl) {
            user_pl.push(pl);
        }
    }
    res.json({ error: false, playlists: user_pl });
})

app.get('/stream', function (req, res) {
    res.json({ albums });
})
app.get('/stream/:id', function (req, res) {
    let idAlbum = req.params.id;
    let songsByAlbum = [];
    songs.forEach(element => {
        if (element.id_album == idAlbum) {
            songsByAlbum.push(element);
        }
    });
    res.json({ songsByAlbum });
})

app.listen(port);