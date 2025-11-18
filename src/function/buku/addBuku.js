import { buku } from "../../../data/buku.js";
import checkSession from "../pengguna/checkSession.js";

export default async function addBuku(req, res) {
    try {
        const nama_buku = req?.body?.nama_buku;
        let hasAccess = await checkSession(["admin", "staff"]);

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        if (!nama_buku) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        buku.push({
            id: buku[buku.length - 1].id + 1,
            buku: nama_buku,
        });

        return res.status(200).send({
            status: "success",
            msg: "buku berhasil ditambahkan",
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/buku/addBuku.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
