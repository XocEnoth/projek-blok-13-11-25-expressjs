import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default async function getAllListPeminjaman(req, res) {
    try {
        let listPinjaman = [];
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
            "!! ERROR : ./src/function/list_peminjaman/getAllListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
