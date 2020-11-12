.PHONY: down install invoke test up watch

.DEFAULT_GOAL  := up
APP_DIR        := ./app

install:
	cd ${APP_DIR}; \
	npm install

test:
	cd ${APP_DIR}; \
	npm run test

watch:
	cd ${APP_DIR}; \
	npm run watch
