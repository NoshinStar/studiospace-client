export async function uploadToImgbb(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be smaller than 5 MB.");
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: fd }
  );
  const json = await res.json();
  if (!json.success) throw new Error("Image upload failed. Paste an image URL instead.");
  return json.data.url as string;
}