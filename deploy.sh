#!/bin/bash

GIT_SHA=$(git rev-parse HEAD)
DATE=$(date --rfc-3339=seconds)
echo GIT_SHA=$GIT_SHA


npm ci

npm test

npm run build

npm run publish:staging


SENTRY_ORG=broswencom
SENTRY_PROJECT=ring
echo Creating release $GIT_SHA in $SENTRY_ORG/$SENTRY_PROJECT

curl https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/ \
 -H "Authorization: Bearer ${SENTRY_AUTH_TOKEN}" \
 -H "Content-Type: application/json" \
 -d "{\"version\":\"${GIT_SHA}\",\"ref\":\"${GIT_SHA}\",\"projects\":[\"${SENTRY_PROJECT}\"],\"dateReleased\":\"${DATE}\"}"

curl https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/$GIT_SHA/files/ \
  -H "Authorization: Bearer ${SENTRY_AUTH_TOKEN}" \
  -H "Content-Type: multipart/form-data" \
  -F "name=~/index.js" \
  -F "file=@dist/index.js"

curl https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/$GIT_SHA/files/ \
  -H "Authorization: Bearer ${SENTRY_AUTH_TOKEN}" \
  -H "Content-Type: multipart/form-data" \
  -F "name=~/index.js.map" \
  -F "file=@dist/index.js.map"