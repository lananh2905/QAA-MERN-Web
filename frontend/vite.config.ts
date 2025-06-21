import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['vn-qa-fe.xn--hanh-0na.vn', 'localhost', '127.0.0.1'], // Thêm host của bạn vào đây
    // port: 3000, // Ví dụ: nếu bạn muốn chỉ định port
    // host: true, // Ví dụ: để cho phép truy cập từ mạng LAN
  },
})
