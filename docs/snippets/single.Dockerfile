# 静态资源
FROM 172.26.59.200/wkfe/app-cdp:R5.0.0-S07-snapshot-129 AS static
RUN mkdir -p /mnt/__public__ && sh /data/entry.sh

# 运行容器
# 详见 https://wakeadmin.wakedata.com/mapp/advanced/container.html#%E5%88%9B%E5%BB%BA%E5%8D%95%E5%BA%94%E7%94%A8%E9%95%9C%E5%83%8F
FROM wkfe/single AS runner

COPY --from=static /mnt/__public__ /data/source/__entry__
COPY --from=static /mnt/__apps__ /data/source/__entry__/__apps__

EXPOSE 80
