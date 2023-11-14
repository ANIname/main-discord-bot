# App Commands
app:
	@make npm-install-if-not-exists
	@node utils/make/app.mjs

# NPM Commands
npm:
	@make npm-install-if-not-exists
	@node utils/make/npm.mjs

npm-install-if-not-exists:
	@[ -d "node_modules" ] || npm i

npm-update:
	@echo "🔄 Updating npm modules to latest versions..."
	@ncu
	@ncu -u
	@echo "🔄 Installing latest versions..."
	@npm i
