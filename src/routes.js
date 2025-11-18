import getAllUsers from "./function/getAllUsers.js";
import getAllBuku from "./function/getAllBuku.js";
import getAllListPeminjaman from "./function/getAllListPeminjaman.js";
import addListPeminjaman from "./function/addListPeminjaman.js";
import updateListPeminjaman from "./function/updateListPeminjaman.js";
import deleteListPeminjaman from "./function/deleteListPeminjaman.js";

export default function routes(app) {
    app.get("/", (req, res) => {
        return res.status(200).send("Hello!");
    });

    app.get("/users", (req, res) => {
        getAllUsers(req, res);
    });

    app.get("/buku", (req, res) => {
        getAllBuku(req, res);
    });

    app.get("/list-peminjaman", (req, res) => {
        getAllListPeminjaman(req, res);
    });

    app.post("/list-peminjaman", (req, res) => {
        addListPeminjaman(req, res);
    });

    app.put("/list-peminjaman/:id", (req, res) => {
        updateListPeminjaman(req, res);
    });

    app.delete("/list-peminjaman/:id", (req, res) => {
        deleteListPeminjaman(req, res);
    });
}
