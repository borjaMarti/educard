export default function manifest() {
  return {
    name: "EduCard",
    short_name: "EduCard",
    description: "Potencia el aprendizaje en el aula y más allá.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#ea7070",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
