# This script substitutes placeholder variables in the frontend assets with their correct runtime values.
# It is needed at the deployment stage because the frontend is already bundled and inside a pre-built image.
sed -i "s|#{backend_base_url}#|${BACKEND_ADDRESS}|g" /usr/share/nginx/html/assets/*.js
sed -i "s|#{max_hints}#|${MAX_HINTS}|g" /usr/share/nginx/html/assets/*.js