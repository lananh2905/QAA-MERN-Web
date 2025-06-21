<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: 5;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>

<h1 align="center"><b>NHẬN DẠNG</b></h1>


# Giới thiệu
* **Tên môn học:** Nhận dạng - CS338.P23
* **Năm học:** HK2 (2024 - 2025)
* **Giảng viên**: Đỗ Văn Tiến
* **Sinh viên thực hiện:**
  
  | STT | MSSV     | Họ và Tên        | Email                   |
  |-----|----------|------------------|-------------------------|
  |1    | 22520083 | Trịnh Thị Lan Anh  | 22520083@gm.uit.edu.vn |
  |2    | 22520148 | Huỳnh Thị Hải Châu | 22520148@gm.uit.edu.vn |
  |3    | 22520236 | Trần Quang Đạt  | 22520236@gm.uit.edu.vn |
  |4    | 22520375 | Vương Dương Thái Hà | 22520375@gm.uit.edu.vn |


# Thông tin đồ án

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
[![Express JS](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Node JS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)](https://nodejs.org/en)
[![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vite.dev/)
[![React JS](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=Kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/elasticsearch-%230377CC.svg?style=for-the-badge&logo=elasticsearch&logoColor=white)
![Rancher](https://img.shields.io/badge/rancher-%230075A8.svg?style=for-the-badge&logo=rancher&logoColor=white)

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


### Built With
```

