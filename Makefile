# Include .env only if exists
ifneq ("$(wildcard .env)","")
	include .env
	export
endif

# Set up development environment
up-dev:
	sh ./api/install.sh
	sh ./web/install.sh
	# docker compose up -d todo-api

# Tear down Docker containers and prune
down:
	docker compose down --remove-orphans -v
	docker system prune -a --volumes -f
