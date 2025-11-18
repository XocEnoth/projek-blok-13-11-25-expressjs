import { list_peminjaman } from "../../data/list_peminjaman.js";
import { user } from "../../data/user.js";
import { buku } from "../../data/buku.js";

export default function updateListPeminjaman(req, res) {
    try {
        const id = Number(req.params.id);
        const { id_user, id_buku } = req.body;

        let listPinjaman = [];
        let beforeChanges;
        let afterChanges;

        if (!id || !id_user || !id_buku) {
            return res.status(400).send({
                status: "invalid",
                msg: "anda tidak memberikan data dengan benar!",
            });
        }

        list_peminjaman.forEach((list) => {
            if (list.id === id) {
                beforeChanges = {
                    id: list.id,
                    id_user: list.id_user,
                    id_buku: list.id_buku,
                };

                afterChanges = {
                    id: id,
                    id_user: id_user,
                    id_buku: id_buku,
                };

                list.id_user = id_user;
                list.id_buku = id_buku;
            }
        });

        list_peminjaman.forEach((list) => {
            user.forEach((usr) => {
                buku.forEach((bku) => {
                    if (list.id_buku === bku.id && list.id_user === usr.id) {
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
            beforeChanges: beforeChanges,
            afterChanges: afterChanges,
            list_peminjaman: listPinjaman,
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/updateListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
