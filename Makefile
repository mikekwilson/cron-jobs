.PHONY: down install invoke test up watch

.DEFAULT_GOAL  := up

install:
	npm install

test:
	npm run test

watch:
	npm run watch
