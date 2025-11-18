import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default function deleteListPeminjaman(req, res) {
    try {
        const id = Number(req.params.id);
        let listPinjaman = [];
        let listDihapus;

        if (!id) {
            return res.status(400).send({
                status: "invalid",
                msg: "anda tidak memberikan data dengan benar!",
            });
        }

        list_peminjaman.forEach((list, index) => {
            if (list.id === id) {
                listDihapus = {
                    id: list.id,
                    id_pengguna: list.id_pengguna,
                    id_buku: list.id_buku,
                };
                list_peminjaman.splice(index, 1);

                list_peminjaman.forEach((list) => {
                    pengguna.forEach((user) => {
                        buku.forEach((book) => {
                            if (
                                list.id_buku === book.id &&
                                list.id_pengguna === user.id
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

                return res.status(200).send({
                    status: "success",
                    listDihapus: listDihapus,
                    list_peminjaman: listPinjaman,
                });
            }
        });

        return res.status(400).send({
            status: "invalid",
            msg: "maaf, kami tidak bisa menemukan data yang anda cari!",
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/deleteListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
