# App Commands
app:
	@make npm-install-if-not-exists
	@make cleanUp
	@node dist/utils/make/app.js

prisma:
	@make npm-install-if-not-exists
	@make cleanUp
	@curl -o services/prisma/schema.prisma https://raw.githubusercontent.com/ANIname/architecture/prod/db/postgresql/schema.prisma
	@node dist/utils/make/prisma.js

# NPM Commands
npm:
	@make npm-install-if-not-exists
	@make cleanUp
	@node dist/utils/make/npm.js

npm-install-if-not-exists:
	@[ -d "node_modules" ] || npm i

npm-update:
	@echo "🔄 Updating npm modules to latest versions..."
	@ncu
	@ncu -u
	@echo "🔄 Installing latest versions..."
	@npm i

cleanUp:
	@rm -rf dist
	@npx eslint src --fix
	@npx tsc