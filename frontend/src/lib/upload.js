export async function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:9999/api"}/upload`, {
    method: "POST",
    body: form
  });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json?.data?.url;
}


