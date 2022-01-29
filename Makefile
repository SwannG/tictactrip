build-dev:
	docker-compose -f docker-compose.dev.yml build
up-dev:
	docker-compose -f docker-compose.dev.yml up
up-dev-orphans:
	docker-compose -f docker-compose.dev.yml up --remove-orphans
down-dev:
	docker-compose -f docker-compose.dev.yml down


build-test:
	docker-compose -f docker-compose.test.yml build
up-test:
	docker-compose -f docker-compose.test.yml up
up-test-orphans:
	docker-compose -f docker-compose.test.yml up --remove-orphans
down-test:
	docker-compose -f docker-compose.test.yml down



build-prod:
	docker-compose -f docker-compose.prod.yml build
up-prod:
	docker-compose -f docker-compose.prod.yml up
up-prod-orphans:
	docker-compose -f docker-compose.prod.yml up --remove-orphans
down-prod:
	docker-compose -f docker-compose.prod.yml down
