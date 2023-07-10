import { connectionString } from "@/constants/common";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    res.status(500).json({ code: "not_connect_database", ok: false });
    return;
  }

  if (req.method === "GET") {
    const db = client.db(process.env.NEXT_PUBLIC_DB_DATABASE);

    try {
      const _result = await db.collection("posts").find({}).toArray();
      const result = _result.reverse().slice(0, 3);
      client.close();

      res.status(200).json({
        code: "get_all_post_success",
        posts: result,
        ok: true,
      });
    } catch (error) {
      client.close();
      res.status(200).json({ code: "get_all_posts_failed" });
      return;
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
