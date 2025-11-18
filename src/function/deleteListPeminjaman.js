import { list_peminjaman } from "../../data/list_peminjaman.js";
import { user } from "../../data/user.js";
import { buku } from "../../data/buku.js";

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
                    id_user: list.id_user,
                    id_buku: list.id_buku,
                };
                list_peminjaman.splice(index, 1);

                list_peminjaman.forEach((list) => {
                    user.forEach((usr) => {
                        buku.forEach((bku) => {
                            if (
                                list.id_buku === bku.id &&
                                list.id_user === usr.id
                            ) {
                                listPinjaman.push({
                                    id: list.id,
                                    id_user: list.id_user,
                                    id_buku: list.id_buku,
                                    username: usr.username,
                                    buku: bku.buku,
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
            msg: "anda tidak memberikan data dengan benar!",
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/deleteListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
