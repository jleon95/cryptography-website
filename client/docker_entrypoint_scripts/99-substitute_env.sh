sed -i "s|#{backend_base_url}#|${BACKEND_ADDRESS}|g" ../usr/share/nginx/html/assets/*.js
sed -i "s|#{max_hints}#|${MAX_HINTS}|g" ../usr/share/nginx/html/assets/*.js