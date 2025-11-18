import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default function getAllListPeminjaman(req, res) {
    try {
        let listPinjaman = [];

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
            list_peminjaman: listPinjaman,
        });
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
