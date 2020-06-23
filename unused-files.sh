#!/bin/bash

# Launch inside a create-react-app project after building the production build.
# Require `jq`.

diff \
	<(find src -type f \( -name '*.js' -o -name '*.jsx' -o -name '*.css' \) | sort) \
	<(cat build/**/*.map | jq --raw-output '.sources | join("\n")' \
		| grep -v '\.\./' | grep -E '\.(js|jsx|css)$' \
		| sed "s#^#src/#" | sort | uniq) \
	| grep '< ' | sed "s#^< ##" | grep -v 'spec'
