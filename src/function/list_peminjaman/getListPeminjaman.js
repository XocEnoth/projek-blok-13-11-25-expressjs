import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default function getListPeminjamanById(req, res) {
    try {
        const { search } = req.body;
        let listPinjaman = [];
        let hasAccess = false;

        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            if (!search) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            list_peminjaman.forEach((list) => {
                pengguna.forEach((user) => {
                    buku.forEach((book) => {
                        if (
                            (list.id === search ||
                                user.username === search ||
                                book.buku === search) &&
                            list.id_pengguna === user.id &&
                            list.id_buku === book.id
                        ) {
                            listPinjaman.push({
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

            if (!listPinjaman.length) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            return res.status(200).send({
                status: "success",
                list_peminjaman: listPinjaman,
            });
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "username atau password salah!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/getListPeminjamanById.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
