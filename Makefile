# Include .env only if exists
ifneq ("$(wildcard .env)","")
	include .env
	export
endif

# Set up development environment
up-dev:
	docker compose up -d postgres
	docker compose up -d redis
	docker compose up -d todo-api
	./wait-for-it.sh -t 0 localhost:5928 -- echo "Postgres is up"
	./wait-for-it.sh -t 0 localhost:6379 -- echo "Redis is up"

# Tear down Docker containers and prune
down:
	docker compose down --remove-orphans -v
	docker system prune -a --volumes -f
