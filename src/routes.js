import getAllUsers from "./function/pengguna/getAllUsers.js";
import getAllBuku from "./function/buku/getAllBuku.js";
import getAllListPeminjaman from "./function/list_peminjaman/getAllListPeminjaman.js";
import addListPeminjaman from "./function/list_peminjaman/addListPeminjaman.js";
import updateListPeminjaman from "./function/list_peminjaman/updateListPeminjaman.js";
import deleteListPeminjaman from "./function/list_peminjaman/deleteListPeminjaman.js";

export default function routes(app) {
    app.get("/", (req, res) => {
        return res.status(200).send("Peminjaman buku!");
    });

    // users
    app.get("/users", (req, res) => {
        getAllUsers(req, res);
    });

    // buku
    app.get("/buku", (req, res) => {
        getAllBuku(req, res);
    });

    // list peminjaman
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
