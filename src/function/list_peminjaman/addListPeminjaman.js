import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default async function addListPeminjaman(req, res) {
    try {
        const { id_pengguna, id_buku } = req.body;
        let listPinjaman = [];
        let last_insert = [];
        let hasAccess = false;

        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password &&
                (user.role === "staff" || user.role === "admin")
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            if (!id_pengguna || !id_buku) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            list_peminjaman.push({
                id: list_peminjaman[list_peminjaman.length - 1].id + 1,
                id_pengguna: id_pengguna,
                id_buku: id_buku,
            });

            pengguna.forEach((user) => {
                buku.forEach(async (book) => {
                    if (user.id === id_pengguna && book.id === id_buku) {
                        await last_insert.push({
                            id: list_peminjaman[list_peminjaman.length - 1].id,
                            id_pengguna: id_pengguna,
                            id_buku: id_buku,
                            username: user.username,
                            buku: book.buku,
                        });
                    }
                });
            });

            list_peminjaman.forEach((list) => {
                pengguna.forEach((user) => {
                    buku.forEach(async (book) => {
                        if (
                            list.id_buku === book.id &&
                            list.id_pengguna === user.id
                        ) {
                            await listPinjaman.push({
                                id: list.id,
                                id_pengguna: list.id_pengguna,
                                id_buku: list.id_buku,
                                username: user.username,
                                buku: book.buku,
                            });
                        }
                    });
                });
            });

            return res.status(200).send({
                status: "success",
                last_insert: last_insert,
                list_peminjaman: listPinjaman,
            });
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/addListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
