import { buku } from "../../../data/buku.js";

export default function getAllBuku(req, res) {
    try {
        return res.status(200).send(buku);
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/buku/getAllBuku.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
