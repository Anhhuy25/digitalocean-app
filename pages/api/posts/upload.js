const cloudinary = require("cloudinary").v2;
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "8mb",
  },
};

async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      // uploadDir: "public/images/upload",
      keepExtensions: true,
    });

    const [_fields, files] = await form.parse(req);
    const file = files.image[0].filepath;
    const upload_preset = "upload_preset";

    try {
      const resImage = await cloudinary.uploader.unsigned_upload(
        file,
        upload_preset
      );
      res.status(200).json({
        message: "Upload successfully",
        ok: true,
        url: resImage.secure_url,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        ok: false,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
