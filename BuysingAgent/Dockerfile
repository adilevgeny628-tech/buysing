FROM nginx:alpine

LABEL maintainer="Buysing <contact@buysing.com>"
LABEL description="Buysing 跨境一站式AGI智能体 SAAS系统"

COPY homepage/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
