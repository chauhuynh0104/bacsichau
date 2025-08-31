const CACHE_NAME = "thuthuat-cache-v1"; 
const URLS_TO_CACHE = [
  "https://chauhuynh0104.github.io/bacsichau/",        // trang chính
  "https://chauhuynh0104.github.io/bacsichau/index.html", // file html
  "https://chauhuynh0104.github.io/gym/giaodien.css",  // css của bạn
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  // thêm các file js/json/txt bạn cần hoạt động offline
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // khi offline thì lấy từ cache
      return caches.match(event.request).then(resp => {
        if (resp) return resp;

        // fallback: báo lỗi
        return new Response(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mất kết nối</title>
<style>
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg,#74ebd5,#9face6);
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    text-align: center;
  }
  .card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    max-width: 400px;
    animation: fadeIn 0.8s ease-in-out;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #e74c3c;
  }
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s;
  }
  button:hover {
    background: #2980b9;
  }
  @keyframes fadeIn {
    from {opacity:0; transform: translateY(20px);}
    to {opacity:1; transform: translateY(0);}
  }
</style>
</head>
<body>
  <div class="card">
    <h1>⚠️ Mất kết nối Internet</h1>
    <p>Bạn đang offline.<br/>Vui lòng kiểm tra lại kết nối mạng của bạn.</p>
    <button onclick="location.reload()">🔄 Thử lại</button>
  </div>
</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
      });
    })
  );
});

