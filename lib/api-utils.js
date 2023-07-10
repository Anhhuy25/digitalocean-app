export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`);
  const data = await res.json();

  return data;
}

export async function getPostV2(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
  const data = await res.json();

  return data;
}

export async function getFeaturedPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/featured`);
  const data = await res.json();

  return data;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`/api/posts/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  return data;
}
