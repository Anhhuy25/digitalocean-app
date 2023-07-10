import { connectionString } from "@/constants/common";
import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect(connectionString);
    const db = client.db(process.env.NEXT_PUBLIC_DB_DATABASE);

    try {
      const { id } = req.query;
      const result = await db
        .collection("posts")
        .find({ _id: new ObjectId(`${id}`) })
        .toArray();
      client.close();

      res.status(200).json({
        code: "get_detail_post_success",
        post: result[0],
        ok: true,
      });
    } catch (error) {
      client.close();
      res.status(404).json({ code: "get_detail_posts_failed" });
      return;
    }
  } catch (error) {
    res.status(500).json({ code: "not_connect_database", ok: false });
    return;
  }
}

export default handler;
