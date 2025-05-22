FROM nginx:alpine

# 复制项目里的 browser/static 文件夹到 nginx 目录
COPY dist/angular_first /usr/share/nginx/html

# 复制 nginx 配置文件
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
