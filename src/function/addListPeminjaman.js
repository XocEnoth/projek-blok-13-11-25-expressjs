import { list_peminjaman } from "../../data/list_peminjaman.js";
import { user } from "../../data/user.js";
import { buku } from "../../data/buku.js";

export default function addListPeminjaman(req, res) {
    try {
        const { id_user, id_buku } = req.body;
        let listPinjaman = [];
        let last_insert = [];

        if (!id_user || !id_buku) {
            return res.status(400).send({
                status: "invalid",
                msg: "anda tidak memberikan data dengan benar!",
            });
        }

        list_peminjaman.push({
            id: list_peminjaman[list_peminjaman.length - 1].id + 1,
            id_user: id_user,
            id_buku: id_buku,
        });

        user.forEach((usr) => {
            buku.forEach((bku) => {
                if (usr.id === id_user && bku.id === id_buku) {
                    last_insert.push({
                        id: list_peminjaman[list_peminjaman.length - 1].id,
                        id_user: id_user,
                        id_buku: id_buku,
                        username: usr.username,
                        buku: bku.buku,
                    });
                }
            });
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
            last_insert: last_insert,
            list_peminjaman: listPinjaman,
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/addListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
