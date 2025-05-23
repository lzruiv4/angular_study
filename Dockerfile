# ---------- BUILD ----------
FROM node:23-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --project angular_first

# ---------- RUN ----------
FROM nginx:alpine

# 拷贝打包后的静态页面（注意 browser 子目录）
COPY --from=build /app/dist/angular_first/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
