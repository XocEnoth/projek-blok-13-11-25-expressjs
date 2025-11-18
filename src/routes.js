import getAllUsers from "./function/pengguna/getAllUsers.js";
import getAllBuku from "./function/buku/getAllBuku.js";
import addBuku from "./function/buku/addBuku.js";
import updateBuku from "./function/buku/updateBuku.js";
import deleteBuku from "./function/buku/deleteBuku.js";
import getListPeminjaman from "./function/list_peminjaman/getListPeminjaman.js";
import getAllListPeminjaman from "./function/list_peminjaman/getAllListPeminjaman.js";
import addListPeminjaman from "./function/list_peminjaman/addListPeminjaman.js";
import updateListPeminjaman from "./function/list_peminjaman/updateListPeminjaman.js";
import deleteListPeminjaman from "./function/list_peminjaman/deleteListPeminjaman.js";

export default async function routes(app) {
    app.get("/", (req, res) => {
        return res.status(200).send("Peminjaman buku!");
    });

    // users
    app.get("/users", async (req, res) => {
        await getAllUsers(req, res);
    });

    // buku
    app.get("/buku", async (req, res) => {
        await getAllBuku(req, res);
    });

    app.post("/buku", async (req, res) => {
        await addBuku(req, res);
    });

    app.put("/buku/:id", async (req, res) => {
        await updateBuku(req, res);
    });

    app.delete("/buku/:id", async (req, res) => {
        await deleteBuku(req, res);
    });

    // list peminjaman
    app.get("/list-peminjaman", async (req, res) => {
        await getAllListPeminjaman(req, res);
    });

    app.get("/peminjaman", async (req, res) => {
        await getListPeminjaman(req, res);
    });

    app.post("/list-peminjaman", async (req, res) => {
        await addListPeminjaman(req, res);
    });

    app.put("/list-peminjaman/:id", async (req, res) => {
        await updateListPeminjaman(req, res);
    });

    app.delete("/list-peminjaman/:id", async (req, res) => {
        await deleteListPeminjaman(req, res);
    });
}
