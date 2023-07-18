module.exports = () => {
  return {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
    reactStrictMode: true,
staticPageGenerationTimeout: 1000
  };
};
