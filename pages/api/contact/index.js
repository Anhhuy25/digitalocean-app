import { REGEX_EMAIL, connectionString } from "@/constants/common";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !REGEX_EMAIL.test(email) ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ code: "invalid_input", ok: false });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ code: "not_connect_database", ok: false });
      return;
    }

    const db = client.db(process.env.NEXT_PUBLIC_DB_DATABASE);

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      delete newMessage._id;
    } catch (error) {
      client.close();
      res.status(500).json({ code: "store_message_failed" });
      return;
    }

    client.close();

    res.status(201).json({
      code: "success_stored_message",
      data: newMessage,
      ok: true,
    });
  }
}

export default handler;
