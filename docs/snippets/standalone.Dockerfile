# CDP
FROM 172.26.59.200/wkfe/app-cdp:R5.0.0-S07-snapshot-129 AS cdp
RUN mkdir -p /mnt/__public__ && sh /data/entry.sh

# web
FROM 172.26.59.200/wkfe/app-web:R5.1.0-S20-snapshot-359 AS web
RUN mkdir -p /mnt/__public__ && sh /data/entry.sh

# ... 其他子应用

# ------------

# *** 基座 ***
FROM 172.26.59.200/wkfe/bay AS bay

# 基座的配置放在这里
ENV MAPP_DOMAIN wdcloud-base-test.wakedt.cn 
ENV MAPP_CDN_DOMAIN wdcloud-base-test-cdn.wakedt.cn 
# 在这里按需添加其他配置

# 拷贝子应用静态资源到基座目录
COPY --from=cdp /mnt/__public__ /data/source/__public__ 
COPY --from=cdp /mnt/__apps__ /data/source/__apps__ 

COPY --from=web /mnt/__public__ /data/source/__public__ 
COPY --from=web /mnt/__apps__ /data/source/__apps__ 
COPY legacy.nginx recommend.nginx /data
