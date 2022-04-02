---
layout: post
title:  "Checking Websockets with curl "
date:   2021-12-07
excerpt: "Checking Websockets with curl "
img: "blog-headers/webhook.png"
---

Naturally the [curl](https://curl.se/) command doesnt allow the ability to curl [websockets](https://en.wikipedia.org/wiki/WebSocket).
example:


```
$ curl --include \
       --no-buffer \
       --header "Connection: Upgrade" \
       --header "Upgrade: websocket" \
       --header "Host: testexample.com:80" \
       --header "Origin: http://testexample.com:80" \
       --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
       --header "Sec-WebSocket-Version: 13" \
       http://testexample.com:80/

```

You can copy this and replace testexample.com with the hostname of your choice and you'll see all the websocket data you need.


Credits and shoutout to this [Gist](https://gist.github.com/htp/fbce19069187ec1cc486b594104f01d0) on GitHub for the original snippet.
