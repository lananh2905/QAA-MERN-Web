# MERN Stack AI Chatbot

## Giới thiệu

Đây là một ứng dụng chatbot AI được xây dựng dựa trên MERN Stack (MongoDB, Express, React, Node.js) và tích hợp API Hugging Face để xử lý ngôn ngữ tự nhiên. Ứng dụng cho phép người dùng gửi câu hỏi và nhận câu trả lời từ chatbot, đồng thời lưu trữ các cuộc trò chuyện trong cơ sở dữ liệu MongoDB.

### Tính năng chính:
- Đăng ký và đăng nhập người dùng với bảo mật cao (JWT, HTTP-Only Cookies, mã hóa mật khẩu).
- Chatbot AI trả lời câu hỏi dựa trên ngữ cảnh do người dùng cung cấp.
- Lưu trữ và quản lý các cuộc trò chuyện của người dùng.
- Xóa toàn bộ lịch sử trò chuyện khi cần.

---

## Công nghệ sử dụng

### Frontend:
- **React**: Framework JavaScript để xây dựng giao diện người dùng.
- **TypeScript**: Ngôn ngữ lập trình mạnh mẽ với kiểu tĩnh.
- **Material-UI**: Thư viện giao diện người dùng để tạo các thành phần UI đẹp mắt.
- **Vite**: Công cụ build nhanh cho các ứng dụng React.

### Backend:
- **Node.js**: Môi trường runtime JavaScript.
- **Express**: Framework để xây dựng API RESTful.
- **MongoDB**: Cơ sở dữ liệu NoSQL để lưu trữ dữ liệu người dùng và cuộc trò chuyện.
- **Mongoose**: Thư viện ORM để tương tác với MongoDB.
- **JWT**: Bảo mật với JSON Web Tokens.
- **Bcrypt**: Mã hóa mật khẩu.

### API:
- **Hugging Face API**: Xử lý ngôn ngữ tự nhiên và trả lời câu hỏi.

### Docker:
- Docker được sử dụng để container hóa ứng dụng, bao gồm cả frontend, backend và MongoDB.

---

## Cách chạy code

### Yêu cầu:
- **Node.js**: Phiên bản >= 18.9.1.
- **Docker**: Để chạy ứng dụng trong container.
- **MongoDB**: Nếu không sử dụng Docker, cần cài đặt MongoDB trên máy.

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd <repository-folder>
```
### Bước 2: Cấu hình môi trường

- **Tạo file .env trong thư mục backend và thêm các biến môi trường:
```bash
git clone <repository-url>
cd <repository-folder>
```
### Bước 3: Chạy ứng dụng với Docker
```
docker-compose up --build
