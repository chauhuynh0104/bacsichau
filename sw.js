const CACHE_NAME = "offline-notice-v1";

self.addEventListener("install", event => {
  // cài đặt nhanh
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // nếu request là trang HTML chính thì trả về thông báo
      if (event.request.mode === "navigate") {
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
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    max-width: 400px;
    text-align: center;
    animation: fadeIn 0.8s ease-in-out;
  }
  h1 { font-size: 24px; color: #e74c3c; margin-bottom: 12px; }
  p { font-size: 16px; margin-bottom: 20px; }
  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
  }
  button:hover { background: #2980b9; }
  @keyframes fadeIn {
    from {opacity:0; transform: translateY(20px);}
    to {opacity:1; transform: translateY(0);}
  }
</style>
</head>
<body>
  <div class="card">
    <h1>⚠️ Mất kết nối Internet</h1>
    <p>Bạn đang offline.<br/>Vui lòng kiểm tra lại kết nối mạng.</p>
    <button onclick="location.reload()">🔄 Thử lại</button>
  </div>
</body>
</html>
        `, { headers: { "Content-Type": "text/html" } });
      }
      // các request khác thì trả về rỗng
      return new Response("", { status: 503, statusText: "Offline" });
    })
  );
});


